# icon 同步

> 在介绍组件库中的 icon 该如何更新与管理前，先尝试改进一下当前的 icon 管理方案，这种改进不止适用于组件库，还可以适用于其他小程序项目。

## 实际开发中的 icon 问题

研发流程中，icon 使用会遇到下面一些实际问题：

- 面对设计稿不知道该使用哪个 icon。
- 设计师不知道开发希望如何（文件格式、尺寸、颜色等信息）提供 icon。
- 开发面对新添加的 icon，需要从 iconfont 上更新并完成 base64 转换等操作，自动化程度低。
- icon 命名混乱，有拼音英文混用、同名、标号错乱等情况。
- icon 庞杂冗余，项目引入过多 icon 会影响代码构建。

针对这些问题，尝试提出一种新的 icon 管理方案。

## 小程序与 icon

首先做一些 icon 相关的调研总结。

icon 使用可以分为两类场景：

- 小程序
- 其前端项目

（这不是废话嘛）之所以小程序单作一例子，基于以下原因：

- 小程序对包大小有限制，过多 icon 的引入会影响包体积。
- 小程序运行环境特殊，web 能力有所阉割。
- 小程序大多面向 C 端，icon 数量种类等丰富度和变化一定程度均高于 B 端页面。

iconfont 是目前主流的 icon 方案，本质是将图标制作为字体。相比于传统的雪碧图等方案有体积小、矢量化、可变色等多种优势，且便于管理与使用。

目前主流的 iconfont 方案有 unicode（使用 html 码点实现）和 class（使用 class 与伪类实现）两种，另外还有一种语义更友好的连字字体，但普及程度有限，这里暂不做讨论。

iconfont.cn 是阿里巴巴提供的一个 icon 管理与分享网站，也很适合企业用作内部的 icon 管理平台，其中除了支持 unicode 和 class 两种方案外，还支持 symbol 方案（利用的是 svg 的 use 特性）。

这三种方案中，由于小程序不支持 html 码点表示和动态 svg 标签插入（参考[网友的实践总结](http://yearito.cn/posts/using-iconfont-in-miniprogram.html)），所以仅 class 方案可行，这也是目前在使用的方法。

综合小程序的技术局限与现实的资源情况，class 方案配合 iconfont 也几乎是小程序中的最佳方案，因此下面的讨论也基于 class 和 iconfont.cn。

icon 与设计稿、图片等然同属由设计师管理维护，但由于 icon 管理在 iconfont.cn，同时会被开发直接使用，相当于设计师间接参与了编码环节。比如 icon 的命名、最终 ttf 文件的内容其实都是由设计师决定的，不同于裁图等开发可以自由控制命名与引用。

由于 iconfont 不支持 icon 改名、瘦身等操作（它似乎已经很久没更新了），而设计师与开发的关注重点又不尽相同，因此共用一套 iconfont 的方案必然会同时限制双方发挥。

对此之前曾经考虑过一些方案，比如在构建时对 iconfont.ttf 进行精简，或自己搭建一套 iconfont 平台，但这些方案均需要投入不小的开发与维护成本，一来不经济，二来远水不解近渴。

在开发通用组件库时，与于冠宋讨论组件库中 icon 实现时，我们发现 iconfont 本身提供了方便的 icon 复用能力，基于此我们设想了一套新的 icon 管理方案。

## 新的 icon 管理方案

方案核心是**打破之前设计师和开发共用一套 icon 库的设定**，转而由开发与设计各自维护一套 icon 库。

（这又听着是一句废话，设计师与开发分用不同的 icon 库，那开发该如何引入 icon？）

iconfont 提供了购物车功能，利用购物车可以将他人的 icon 加入到自己的 icon 项目中。

![你的代码很棒，现在它是我的了](./images/gitrob.jpg)

利用这一方式，实际研发流程中 icon 使用可以转换为如下流程：

- 设计师与开发只需要各自在 iconfont 上创建一个 icon 项目
- 设计师在自己的 icon 项目中上传 icon
- 开发根据项目中实际需要哪些 icon 而从设计师的 icon 项目中选择 icon 加入开发的 icon 项目

由于 iconfont 不支持 icon 改名（名字只用作展示，并非是 class），因此通过购车添加的 icon 也会继承之前的名字，如果希望 icon 名也可以修改，可以选择下载 svg 再上传的方式。

分离的好处是双方可以各自控制自己的 iconfont 项目而发挥最大的自由度，设计可以藉此创建一套大而全的通用 icon 库，开发也可以根据实际 icon 情况完成项目中 icon 的瘦身。

## 账号与权限

至于如何维护项目与账号之间的关系，可以根据实际情况决定，同时由于开发与设计分离，所以可以各自根据自己实际需求选择账号逻辑。这里只做简单讨论。

项目、账号、人之间无外乎 1 对 1 与 1 对多关系，即是否多人共用一个账号或是否一个账号管理多个项目。

决定这之中选择的不外乎权限控制、操作记录、方便等考虑因素。对于一个项目，iconfont 提供了管理员、参与者和只读身份三种角色用于权限控制，基于此，可以设定如下的简易操作方案。

- 设计师与开发各自使用一个公共的管理员账号用于双方的 icon 项目创建，同时设计师对开发账号添加只读权限（避免开发误操作）。
- 设计师根据统一设计规范或按产品划分等管理多个 icon 项目下的 icon，icon 命名规则等完全由设计师自定决定，只需在设计稿对应位置标明 icon 所属项目和命名。
- 开发按照通用组件库或 git 仓库创建 icon 项目，并按照设计稿上的标号 pick 对应 icon 组成对应的 iconfont。

这样的好处是只需要两个公共账号，避免了频繁的权限添加等操作，但缺点时由于没有权限控制，所以无法应对人员离职等情况，但鉴于破坏 iconfont 项目影响有限且均有 sketch、代码等文件作为备份，所以前期可以选择从简。

如果希望加入权限控制，只需要设计和开发每人各自创建自己的私人账号，同时根据入离职等情况添加对应项目的权限即可。

这种方案下，最开始五个问题可以解决其中 4 个

- 面对设计稿不知道该使用哪个 icon —— 查看对应标号
- 设计师不知道开发希望如何（文件格式、尺寸、颜色等信息）提供 icon —— 上传到 iconfont 即可
- icon 命名混乱，有拼音英文混用、同名、标号错乱等情况 —— 各自根据自己的习惯命名即可
- icon 庞杂冗余，项目引入过多 icon 会影响代码构建 —— 开发可以控制自己的 iconfont 项目中的 icon

## iconSync

仅剩余转换 base64 操作较为复杂，但这一步可以通过自动化来完成。

iconfont.cn 会对每个项目提供在线链接以直接插入到代码中，本质是 cdn 链接。由于小程序的特殊性，并不推荐使用该 cdn 链接（比如页面渲染完成了，icon 还未加载完毕），但可以根据 cdn 获取 iconfont 的全部 css、font.ttf 等内容。

又由于 cdn 链接本身是匿名的，所以无需考虑身份校验等问题，因此可以通过如下的命令直接更新代码中的`icon.scss`

```bash
npm run icon:sync //at.alicdn.com/t/font_xxxxxx.css
```

最终可自动生成如下的文件

```scss
@font-face {
  font-family: "hui-design-iconfont";
  /* stylelint-disable-next-line scss/operator-no-unspaced */
  src: url(data:application/font-woff2;charset=utf-8;base64,xxxxxx==) format("woff2");
  font-style: normal;
  font-weight: normal;
}

.hui-icons {
  display: inline-block;
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-family: hui-design-iconfont;
}

.hui-icon-001-success::before {
  content: "\ea14";
}
```

即实现一键完成代码中的 icon 更新。

同时`icon:sync`还可以提供正则等对 icon 的命名规则进行检验，详见`syncIcon.js`。

至此开头提到的实际问题均得到解决。

TODO:

> 自带 icon 命名方案。
