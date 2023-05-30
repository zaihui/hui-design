# 自定义导航 NavBar

## 介绍

顶部应用栏显示与当前页面相关的信息和操作

## 使用指南

文件中引入组件页面必须开启自定义导航配置

navigationBarStyle: 'custom'

NavBar 的 theme 属性要和页面的 navigationBarTextStyle 保持一致

```jsx
import React from 'react'
import { HuiNavBar } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <View className='page'>
    <HuiNavBar showHome title='自定义导航' />
    <View className='page-content'>页面内容</View>
  </View>
)

export default Demo
```

代码示例

<<< src/pages/NavBar/NavBar.tsx#demo

## 参数

<auto-doc path="components/NavBar/index.tsx" />

<demo-phone page="/pages/NavBar/NavBar" />
