# Badge 徽标

## 介绍

徽标，可展示红点、数字和文字

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiBadge } from '@zaihui/hui-design'
import { View } from '@tarojs/components'

const Demo: React.FC = () => (
  <>
    <HuiBadge dot>
      <View>内容</View>
    </HuiBadge>
    <HuiBadge value={3}>
      <View>内容</View>
    </HuiBadge>
    <HuiBadge value='热门售卖'>
      <View>内容</View>
    </HuiBadge>
    <HuiBadge value='NEW' type='hollow'>
      <View>内容</View>
    </HuiBadge>
  </>
)

export default Demo
```

代码示例

<<< src/pages/Badge/Badge.tsx#demo

## 参数

<auto-doc path="components/Badge/Badge.tsx" />

<demo-phone page="/pages/Badge/Badge" />
