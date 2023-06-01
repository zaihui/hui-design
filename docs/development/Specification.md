# 技术规范

## 依托 Taro

Taro 自身提供了基于[Taro 开发第三方多端 ui 库的功能](https://taro-docs.jd.com/taro/docs/ui-lib)，因此只需按照普通小程序项目的开发方式开发组件，同时`index.js`声明需要导出的组件，最后执行`cross-env TARO_BUILD_TYPE=component taro build --ui`即可完成组件库的打包。

但 Taro 的组件打包方式有些让人迷惑，它几乎未组件进行任何编译处理、相当于直接 copy 源代码中的 tsx、scss 文件到目标目录，而编译则由最终在使用组件库的项目中完成。这种方式决定了使用 Taro 编写的组件库无法在非 Taro 的项目中使用，但也带来了可以编译时定制主题的功能。

## css 全局污染与主题定制

Taro2.0 目前的编译方式为将 Taro 组件编译为小程序规范的组件，因此 css 全局污染的问题本身是不存在的。但 Taro-ui 需要提供编译时主题色定义的能力，但如果使用传统组件 tsx 文件引入 scss 文件的方式，scss 的变量无法被外部修改或覆盖，主题色定义便无法实现。

编译时定制主题色对于 hui-design 来说目前并不是刚需，但编译时 px 转 rpx 的配置（见后文 px 问题）对于 hui-design 是必须的。因此 taro-ui 对于编译时定制主题色的支持方式依然值得借鉴。

由于组件 tsx 引入的 scss 无法被外部变量触及，自然解决方式便是释放对 scss 的引入控制，由使用组件库的项目自行引入，这样既可在引入前完成对 scss 变量的覆盖。

scss 恰好提供了[变量默认值](https://sass-lang.com/documentation/variables#default-values)的功能。

```scss
$theme-primary: #1e90ff !default;
```

上述代码的语义为：如果`$theme-primary`变量尚未定义/值为 null，则设定`$theme-primary`变量值为`#1e90ff`，否则`$theme-primary`依然沿用之前设定的初始值。

利用这一特性，即可实现编译时主题色的定制。

对于`variables.scss`

```scss
// 设定主题色，允许被外部覆盖
$theme-primary: #1e90ff !default;
```

对于`component.scss`

```scss
@import './variables.scss';

.title {
  color: $theme-primary;
}
```

对于使用组件的页面中的`page.scss`

```scss
// 需要覆盖的变量一定要在引入前定义。
$theme-primary: #ed3737;

@import 'ui-lib/component.scss';
```

最终编译后 title 的颜色将会为`#ed3737`。

虽然这样完美解决了编译时主题色配置的问题，但依赖于使用组件需要额外手动引入组件对应的 scss 过于繁琐，因此 taro-ui 也提供了将所有组件的 css 文件统一通过 index.scss 导出的方案，这样只要在`app.scss`中引入`ui-lib/index.scss`即可引入所有样式。

全局引入所有样式的方案解决了按需引入时的繁琐问题，但同时带来了两个问题，一是引入了过多的 css 样式（当然全局引入就是为了引入全部的组件样式，如果只依赖了一两个组件自然应该选择按需引入）、二是带来了全局的样式污染，因为`app.scss`会对全局生效。

为此 taro-ui 使用了命名空间来解决这一问题，所有的组件与组件样式统一冠以前缀“At”，如`AtButton`、`.at-button`。hui-design 也采用这一做法。

TODO: 这一做法需要配置 option

TODO: 兼容性说明，最低基础库版本

## 命名规范

经过大家投票，选择了`hui`作为前缀，又是 h-ui 的简写。

命名前缀需要在组件名、组件类名、scss 变量名、icon 类名中使用，示例如下：

```jsx
<HuiButton>click me!</HuiButton>
```

```scss
$hui-theme-primary: #ed3737;

.hui-button {
  color: $hui-theme-primary;
}

.hui-icon {
  font-family: iconfont, sans-serif;
}

.hui-icon-001-arrow {
  content: '\e665';
}
```

## 文件组织规范

TODO:

> pages、widgets、components 文件夹、组件命名。

## px 问题

面对移动端多种尺寸、分辨率的屏幕，小程序使用了 rpx 作为适配方案，即屏幕宽永远等于 750rpx。与之前在 h5 中使用的 rem 原理相同。过往的很多小程序项目中都采用了小程序的 rpx 作为适配方案，虽然可能随着框架的变化写法不同，比如 Taro 是直接把 px 转换为 rpx，Mpvue 是把 rem 转为 rpx。

对于不同的项目，设计师可能会提供不同屏宽的设计稿，通常是 375 或 750。因此不同项目中 px 转 rpx 可能需要乘以不同的比例系数。px 转 rpx 的操作发生在编译期，因此组件库无法预知组件中的`1px`会被实际编译为多少`rpx`。

针对这一问题，有两种解决思路，一是采用更加响应式的布局理念，放弃这种按比例缩放的做法。即使用 vw、百分比、flex 等适配各种比例的屏幕。从真正的用户体验上来讲，响应式是优于缩放的。但从开发角度讲，响应式需要设计师提供多种屏幕尺寸下的设计稿，开发时亦需要多种屏幕下的测试，即使这样，最终还可能会因为使用组件库的项目依然使用缩放布局而导致一些 ui 细节无法对齐等问题。

鉴于目前小程序还不太考虑平板场景的用户，而手机屏幕大多在 5-6 英寸左右，使用响应式布局投入成本过高却又不是刚需，因此目前使用缩放布局是最佳的解决方案。

对此可以利用[主题定制](#主题定制)的解决方案，定义 px 函数来实现编译时配置 px 转 rpx 比例系数，比如：

```scss
$hui-designWidth: 375 !default; // 默认使用设计稿尺寸

// 将 375 尺寸下的像素转换为其他尺寸下的像素
@function px($px) {
  @return unquote(($px / (375 / $hui-designWidth)) + 'px');
}

.title {
  height: px(40);
}
```

对于使用组件库的项目，只需要按照覆盖主题色的方式重新定义`$hui-designWidth`即可。

## types

虽然 taro 在构建组件库时，近乎是 ts 文件的拷贝，但最终发布为 npm 包后，vscode 并未能够提供类型提示。

对比 taro-ui 组件库发现，taro-ui 是通过在 package.json 中添加`types`字段声明`d.ts`文件实现类型提示的，分析其原因可能是因为 npm 包的 main 字段依然是 js 文件。但不论如何，只要照着 taro-ui 搞一下 types 就好了。

令人惊讶的是 taro 的 types 似乎是手动编写的，不知出于什么原因。这里我们考虑使用自动化的方案，因此添加了`typescript.types.json`用于编译 types 文件。

```js
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "esModuleInterop": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "lib/types"
  },
  "include": [
    "./src/index.ts"
  ]
}
```

其中`emitDeclarationOnly`选项没有出现在官方文档中，但有[pr](https://github.com/microsoft/TypeScript/pull/20735)可以参考，用于只生成声明文件。

依此配置执行`tsc -p ./tsconfig.types.json`即可生成对应的类型声明文件，但缺点是`import './styles/index.scss`也出现在了其中，不过实际验证发现并不影响类型提示，所以暂不理会。

## icon 问题

TODO:

> hui-design 的自带 icon、使用外部 icon、icon:sync
