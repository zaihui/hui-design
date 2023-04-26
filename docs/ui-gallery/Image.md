# Image组件

## 介绍

对Taro的Image组件的进一步封装，主要新增了占位相关的样式

## 使用指南

文件中引入组件

```tsx
import React from 'react'
import { HuiImage } from '@zaihui/hui-design'

const imgUrl = ''
const Demo: React.FC = () =>  (
  <HuiImage src={imgUrl}  width={100} height={50} animated />
)

export default Demo
```

代码示例

<<< src/pages/Image/Image.tsx#demo

## 参数

<auto-doc path="components/Image/Image.tsx" />

<demo-phone page="/pages/Image/Image" />
