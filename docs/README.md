---
home: true
# 图片先随便来个好了
heroImage: https://pasta.zaihui.com.cn/fe/extension/pangu-ext/-/avatar
heroText: hui-design-文档
tagline: hui-design文档系统
actionText: 开始使用
actionLink: /introduce/
features:
  - title: ui组件
    details: 可复用的样式级别组件。
  - title: widget组件
    details: 可复用的业务级别组件。
  - title: 通用工具函数
    details: 可复用的通用逻辑与工具函数。
footer: zaihui Licensed | Copyright © forseti
---

# hui-design

## 使用说明

在 docs 下添加的`.md`文件会被自动编译到 vuepress 文档下，可以通过`npm run docs:dev`来调试查看。

顶部导航栏的搜索框可以按照文档的一二级标题进行搜索，为了保证文档的检索效果，需要要求 markdown 文件有严格的一二级标题，可以安装 vscode 的 markdown 插件[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)自动检查。

构建时控制台可能会输出`Language does not exist text`，这是因为 markdown 下如果有 code 块使用了 text 声明，可以忽略。

vuepress 的配置文件在`docs/.vuepress/config.js`，vuepress 的文档地址为[https://vuepress.vuejs.org/](https://vuepress.vuejs.org/)

vuepress 会把 readme 文件编译为 index.html，其他文件保留原文件名。配置中做了使用文件名自从生成侧边栏的操作，因此文件名建议不超过 15 个汉字以保证在 13 寸 mac 下不会折行(12 寸 surface 的用户欢迎来提 pr)。

## vue-press 避坑指南

### 使用 yarn

依赖 webpack 3.x 的情况下，官方推荐使用 Yarn 而不是 npm 来安装 VuePress。因为 npm 会生成错误的依赖树。

[官方说明](https://vuepress.vuejs.org/zh/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE)

### 依赖报错

按照官方`npm run docs:dev`后会在浏览器控制台看到如下报错：

```text
Module not found: Error: Can't resolve 'core-js/library/fn/array/from' in '/home/travis/build/max-team/Mars/node_modules/@babel/runtime-corejs2/core-js/array'
resolve 'core-js/library/fn/array/from' in '/home/travis/build/max-team/Mars/node_modules/@babel/runtime-corejs2/core-js/array'
```

参考对应的[issue](https://github.com/vuejs/vuepress/issues/1529)中 darkskygit 提供的解决方法，安装`@vue/babel-preset-app@next`即可。

### markdown 扩展名

markdown 扩展名需要严格使用`.md`，大写的`.MD`不会被 vuepress 识别。readme 的大小写没有要求。
