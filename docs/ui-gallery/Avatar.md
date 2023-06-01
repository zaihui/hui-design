# Image 组件

## 介绍

基于 Image 组件，针对头像场景进行再次封装的组件

## 使用指南

文件中引入组件

```tsx
import React from 'react'
import { HuiAvatar } from '@zaihui/hui-design'

const imgUrl = ''
const Demo: React.FC = () => (
  <HuiAvatar src={imgUrl} size='medium' borderColor='#ddd' type='circle' />
)

export default Demo
```

代码示例

<<< src/pages/Avatar/Avatar.tsx#demo

## 参数

<auto-doc path="components/Avatar/Avatar.tsx" />

<demo-phone page="/pages/Avatar/Avatar" />
