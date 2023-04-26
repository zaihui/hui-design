# Grid 宫格导航

## 介绍

宫格导航，一般用于承载首页的功能模块的导航，点击可以跳转到对应页面。

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiGrid } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <HuiGrid>
    <HuiGridItem image='https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1' text='天猫新品' />
    <HuiGridItem image='https://gw.alicdn.com/tfs/TB1LvIxVAvoK1RjSZFDXXXY3pXa-183-144.png?getAvatar=1' text='今日爆款' />
    <HuiGridItem image='https://gw.alicdn.com/tfs/TB19uWKXkCy2eVjSZPfXXbdgpXa-183-144.png?getAvatar=1' text='天猫国际' />
  </HuiGrid>
)

export default Demo
```

代码示例

<<< src/pages/Grid/Grid.tsx#demo

## 参数

<auto-doc path="components/Grid/Grid.tsx" />

<demo-phone page="/pages/Grid/Grid" />
