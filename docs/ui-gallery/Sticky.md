# Sticky 吸顶布局

## 介绍

吸顶布局，与CSS 中position: sticky属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiSticky, HuiButton } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <HuiSticky>
    <HuiButton>被吸顶部分</HuiButton>
  </HuiSticky>
)

export default Demo
```

代码示例

<<< src/pages/Sticky/Sticky.tsx#demo

## 参数

<auto-doc path="components/Sticky/Sticky.tsx" />

<demo-phone page="/pages/Sticky/Sticky" />
