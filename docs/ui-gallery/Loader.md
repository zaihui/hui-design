# Loader组件

## 介绍

提供了页面级loading、模块级loading以及触底加载loading效果

## 使用指南

文件中引入组件

```tsx
import React from 'react'
import { HuiLoader } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <>
    // 默认为page loading
    <HuiLoader loading>page content</HuiLoader>

    // 模块loading 父容器要指定大小
    <View style={{ width: 200, height: 200 }}>
      <HuiLoader loading type='module'>module content</HuiLoader>
    <View/>

    // 触底加载,reachedBottom指定到了触底加载完成的样式
    <HuiLoader loading type='bottom' reachedBottom={condition}>
      {data.map(v => <View>list content<View/>)}
    </HuiLoader>
  </>
)

export default Demo
```

代码示例

<<< src/pages/Loader/Loader.tsx#demo

## 参数

### Loader
<auto-doc path="components/Loader/Loader.tsx" />

<demo-phone page="/pages/Loader/Loader" />
