# Tabs 标签页

## 介绍

标签，分为固定标签栏和滚动标签栏。固定标签栏支持 2 到 4 个标签。滚动标签栏则不做限制，但有部分标签可能被隐藏。

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiTabs } from '@zaihui/hui-design'

const { HuiTab } = HuiTabs

const Demo: React.FC = () => (
  <HuiTabs active={normalTabsTwoIndex}>
    <HuiTab title='标签一'>
      <View>标签一的内容</View>
    </HuiTab>
    <HuiTab title='标签二'>
      <View>标签二的内容</View>
    </HuiTab>
  </HuiTabs>
)

export default Demo
```

代码示例

<<< src/pages/Tabs/Tabs.tsx#demo

## 参数

### Tabs

<auto-doc path="components/Tabs/Tabs.tsx" />

### Tab

<auto-doc path="components/Tabs/Tab/Tab.tsx" />

<demo-phone page="/pages/Tabs/Tabs" />
