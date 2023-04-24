# Icon 图标

## 介绍

基于字体的图标集

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiIcon } from '@zaihui/hui-design'

const Demo: React.FC = () => <HuiIcon name='icon-001-success' />

export default Demo
```

## 使用自定义字体图标库

以iconfont作为图标库为例，新建图标项目设置FontClass/Symbol前缀（避免设置前缀为`hui-`，该前缀为内置图标集的样式前缀），并新建icon.scss

```scss
/* icon.scss */
@font-face {
  font-family: 'my-iconfont';
  font-style: normal;
  font-weight: normal;

  /* 自行安装第三方字体图标库 */
  src: url(PATH_TO_FONT);
}

/* 根据第三方字体图标库编写 */

/* 举例：fa 就是 prefixClass 的值，下面的的图标 css class 命名都要用 fa- 开头  */
.fa {
  display: inline-block;
  font-family: 'my-iconfont';
}

.fa-clock::before {
  content: "\f00c";
}
```

然后在`app.js`全局引入`icon.scss`，引用组件时加上对应的`prefixClass`即可

```js
<HuiIcon name='clock' prefixClass='fa' />
```

## 参数

### Icon
<auto-doc path="components/Icon/Icon.tsx" />

<demo-phone page="/pages/Icon/Icon" />
