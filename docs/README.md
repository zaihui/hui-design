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

在docs下添加的`.md`文件会被自动编译到vuepress文档下，可以通过`npm run docs:dev`来调试查看。

顶部导航栏的搜索框可以按照文档的一二级标题进行搜索，为了保证文档的检索效果，需要要求markdown文件有严格的一二级标题，可以安装vscode的markdown插件[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)自动检查。

构建时控制台可能会输出`Language does not exist text`，这是因为markdown下如果有code块使用了text声明，可以忽略。

vuepress的配置文件在`docs/.vuepress/config.js`，vuepress的文档地址为[https://vuepress.vuejs.org/](https://vuepress.vuejs.org/)

vuepress会把readme文件编译为index.html，其他文件保留原文件名。配置中做了使用文件名自从生成侧边栏的操作，因此文件名建议不超过15个汉字以保证在13寸mac下不会折行(12寸surface的用户欢迎来提pr)。

## vue-press避坑指南

### 使用yarn

依赖webpack 3.x的情况下，官方推荐使用Yarn而不是npm来安装VuePress。因为npm会生成错误的依赖树。

[官方说明](https://vuepress.vuejs.org/zh/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE)

### 依赖报错

按照官方`npm run docs:dev`后会在浏览器控制台看到如下报错：

```text
Module not found: Error: Can't resolve 'core-js/library/fn/array/from' in '/home/travis/build/max-team/Mars/node_modules/@babel/runtime-corejs2/core-js/array'
resolve 'core-js/library/fn/array/from' in '/home/travis/build/max-team/Mars/node_modules/@babel/runtime-corejs2/core-js/array'
```

参考对应的[issue](https://github.com/vuejs/vuepress/issues/1529)中darkskygit提供的解决方法，安装`@vue/babel-preset-app@next`即可。

### markdown扩展名

markdown扩展名需要严格使用`.md`，大写的`.MD`不会被vuepress识别。readme的大小写没有要求。
