# UnitTest

hui-design 的 ut 测试使用 jest 框架，分为对普通工具函数的测试和对组件的测试两种，对组件的测试使用 jest 提供的 Snapshot Test。

## typescript

推荐 ut 代码使用 ts、tsx，可以有更好的类型提示。

## alias

为了方便 ut 编写时文件引入，test 目录下可以使用`@`作为`src`的 alias，这一设定对`src`下的文件同样有效，但由于 taro 对组件的编译近乎于代码拷贝，并不会对`@`这样的 alias 做处理，为了避免编译后的组件在使用中出现引用路径无法解析问题，请不要在`src`下使用 alias。同时在 eslint 中刻意只为`test`目录配置了 alias 解析，因此`src`下使用 alias 会导致 lint 错误。

## snapshot

taro-ui 自身也使用 snapshot test，因此有对应配置可以参考。

但 taro-ui 的 snapshot test 使用一些令人疑惑的地方。

- 首先是 test 文件使用 js 作为扩展名但实际其中却使用了 jsx 语法，不方便编辑器提示与 lint 检查。
- 其次是 ut 是基于`taro-h5`而非基于`taro`，这点一定程度可以理解，因为小程序没有 dom 接口。
- 最后是测试是组件的引入路径为编译时产生的`.temp`目录而非`src`，这意味着 ut 执行前必须先执行构建操作，路径依赖过长。

先对`src`和`.temp`下的 DemoWidget 做一个分析

src 下：

```tsx
import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'

export interface DemoWidgetProps {
  /**
   * 一个字符串型的属性
   */
  prop1: string
  /**
   * 一个数值类型的可选属性
   */
  prop2?: number
}
/**
 * 一个示例Widget
 */
export default class LoginWidget extends Component<DemoWidgetProps> {
  render() {
    const { prop1, prop2 = 0 } = this.props
    return (
      <View className='demo-widget'>
        this is DemoWidget
        <View>prop1 is {prop1}</View>
        <view>prop2 is {prop2}</view>
      </View>
    )
  }
}
```

.temp 下：

```jsx
import Nerv from 'nervjs'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro-h5'
/**
 * 一个示例Widget
 */
export default class LoginWidget extends Taro.Component {
  render() {
    const { prop1, prop2 = 0 } = this.props
    return (
      <View className='demo-widget'>
        this is DemoWidget
        <View>prop1 is {prop1}</View>
        <view>prop2 is {prop2}</view>
      </View>
    )
  }
}
```

对比可得，`.temp`相比`src`下的代码做了如下处理：

- `@tarojs/taro`模块被替换为了`@tarojs/taro-h5`
- 引入了 Nerv
- 将 tsx 编译为了 jsx，但扩展名却使用 js。

结合 taro-ui 使用的 ut 配置，可以发现，代码书写时 jsx 的 pragam 为`Taro.createElement`，但执行 ut 时更换为了`Nerv.createElement`，所以需要引入`nervjs`。

而`@tarojs/taro`替换为`@tarojs/taro-h5`的操作可以通过 jest 的 moduleNameMapper 完成。

因此怀疑 taro-ui 在 ut 前执行构建的原因是为了导入`Nerv`与替换`taro`，但为此多一道编译也未免太失之优雅。可能是其中有其他隐藏的问题，但也没有找到官方对此的说明。

为了避免陈陈相因萧规曹随，在项目初期的时候本着大胆尝试的原则，在这里放弃复刻 taro-ui 的 ut 设定，按照实际需要来完成 ut 配置。

对此需要解决 taro-ui ut 的两大不合理之处，一是在 js 文件中编写 jsx，二是 ut 依赖`.temp`目录。

首先解决 js 中编写 jsx 的问题，由于 src 下的组件普遍使用 tsx 编写，如果 ut 中也使用 ts，可以带来更方便的代码提示，所以直接对组件的 test 文件使用 tsx。只需要对应修改 tsconfig.json 中的 include、jest.config.js 中的 testMatch 与对应 eslint 中的 lint 配置即可。

解除 ut 对`.temp`目录的依赖比较麻烦一些，中间有一些踩坑。

首先仿照 taro-ui 下组件的 ut 为 DemoWidget 编写 ut 文件，同时安装需要的依赖。

由于 jest 无法处理 tsx 文件，所以首先要利用`@babel/plugin-transform-react-jsx`编译代码中的 tsx 语法，同时配置`pragma: 'Nerv.createElement'`以符合 ut 使用`Nerv`的需要。

但由于组件源代码中引入的是 Taro 而非 Nerv，要求组件对此做适配显然不合理，因此使用[babel-plugin-auto-import](https://www.npmjs.com/package/babel-plugin-auto-import)自动为 ut 执行时**所有代码**额外引入`Nerv`。

另外由于 mobx 使用了 legacy 的 decorators 语法，typescript 使用了 class-properties 语法，所以需要额外添加`@babel/plugin-proposal-decorators`、`@babel/plugin-proposal-class-properties`，否则会导致 jest 收集 coverage 时无法解析对应源代码而报错。

这一步完成后可以尝试执行 ut，会遇到无法解析`weui.css`的报错，这里可以参考 jest 的官方文档以及 taro-ui 的做法，对 css 进行 mock 操作，由于 weui 是一个单独的 npm 包，所以 jest 提供的 mock 方法对 weui 无效，需要单独配置。

再次执行 ut 会遇上`TypeError: Cannot read property 'forEach' of undefined`报错，需要配置`'^@tarojs/taro$': '@tarojs/taro-h5'`以替换`@tarojs/taro`为`@tarojs/taro-h5`。

再次执行 ut，这是 ut 已可以正常运行。

同时回顾一下 taro-ui 的相关配置，看看是否有遗漏。

taro-ui 在`jest.config.js`中配置了额外的 moduleNameMapper 规则

```js
{
  react: 'nervjs',
  'react-addons-test-utils': 'nerv-test-utils',
  'react-dom': 'nervjs',
}
```

但奇怪的是整个项目中都没有 react、react-addons-test-utils、react-dom 这三个依赖，所以这三条规则近乎无效。

但是由于这三条规则的键名都为普通字符串不包含正则的`^$`，按照[moduleNameMapper](https://jestjs.io/docs/en/configuration#modulenamemapper-objectstring-string--arraystring)的规则，`react`会命中所有名字中含`react`的库。如果贸然搬运这三条规则，会因此破坏对`react-is`包的导入进而产生`PrettyFormatPluginError: ReactIs.isElement is not a function`报错。

但令人疑惑的是，在 taro-ui 使用的配置下并不会遇到这个问题，但同时删除这三条规则 taro-ui 的 ut 依然可以全部通过，因此这三条规则的存在非常令人疑惑，这里决定不搬运这三条规则。

另外 taro-ui 的`babel-config.js`中配置了插件`babel-plugin-transform-taroapi`，在 npm 页面没有找到该插件的功能说明，但 google 到了凹凸实验室的的一篇[文章](https://www.infoq.cn/article/XkGVKMuMw_zqXw3Plh51)，该插件的作用是避免不必要的`Taro.*`api 引入，减少 h5 包体积。对于 ut 来说，似乎并不是必要，所以这里不作采用。

自此 ut 的配置应当结束，为了验证这样的 ut 配置是否可以正确运行，搬运同样的配置到 taro-ui 项目中，并修改其`.temp`引用为`src`，执行 ut 结果如下。

```text
Test Suites: 4 failed, 44 passed, 48 total
Tests:       335 passed, 335 total
Snapshots:   298 passed, 298 total
```

其中有 4 个测试文件执行失败，临时注释对应的用例后再次执行 ut，结果如下。

```text
Test Suites: 48 passed, 48 total
Tests:       354 passed, 354 total
Snapshots:   316 passed, 316 total
```

可以看到，共 316 个 snapshots 全部执行成功，其余非 snapshots 的用例有 38 个也全部执行成功，从数量上来讲，足够相信新的配置对于 snapshots 是有效的。

分析失败的 4 个 ut 文件，均为包含`toBeCalled`的用例执行失败，是用来在模拟点击后测试元素的回调时间。但包含`toBeCalled`的测试文件共有 18 个，其中大部分都执行成功了，因此这 4 个失败怀疑可能是升级 jest 版本（taro-ui 尚在使用 v23 的 jest 版本，与 babel7 搭配会有问题）后导致的不兼容，可以在写到具体用例时再做分析。但总体上新的配置是可以被采用的。

如果后期因为配置异于 taro-ui 的设置导致 ut 产生问题的话，可以切换为 taro-ui 使用的配置，迁移成本不会太高。
