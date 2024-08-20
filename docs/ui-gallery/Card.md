# Card 组件

## 介绍

卡片展示基本组件（内置有 Header 和 Body 水平布局、Header 和 Body 竖直布局两种样式）当索引图尺寸 > 48px 时，为水平布局；当索引图尺寸 <= 48px 时，为竖直布局

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { Card } from '@zaihui/hui-design'

const detail = (
  <View className='detail'>
    详情
    <HuiIcon name='012-right' size={10} style={{ marginLeft: pxTransform(2) }} />
  </View>
)

const content = (
  <View className='card-content'>
    <View className='content-tip'>字段名：字段内容字段内容字段内容</View>
    <View className='content-tip'>字段名：字段内容字段内容字段内容字段内容</View>
    <View className='content-tip'>字段名：字段内容字段内容字段内容</View>
  </View>
)

const buttons = (
  <View className='buttons'>
    <View className='white-button button'>按钮</View>
    <View className='primary-button button'>按钮</View>
  </View>
)

const logo = <View className='default-logo' />

const Demo: React.FC = () => (
  <Card
    title='卡片标题'
    logo={logo}
    logoStyle={{ width: 80, height: 80, borderRadius: 4 }}
    assistTip={detail}
    content={content}
    actions={buttons}
  />
)

export default Demo
```

代码示例

<<< src/pages/Card/Card.tsx#demo

## 参数

### Card

<auto-doc path="components/Card/Card.tsx" />

<demo-phone page="/pages/Card/Card" />
