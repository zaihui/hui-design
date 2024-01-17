# NoticeBar 通知

## 介绍

通知

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiNoticeBar } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <>
    <HuiNoticeBar>通知文字</HuiNoticeBar>
    <HuiNoticeBar icon>通知文字</HuiNoticeBar>
    <HuiNoticeBar type='marquee'>通知文字</HuiNoticeBar>
    <HuiNoticeBar icon type='close'>
      通知文字
    </HuiNoticeBar>
    <HuiNoticeBar icon type='more'>
      通知文字
    </HuiNoticeBar>
  </>
)

export default Demo
```

代码示例

<<< src/pages/NoticeBar/NoticeBar.tsx#demo

## 参数

<auto-doc path="components/NoticeBar/NoticeBar.tsx" />

<demo-phone page="/pages/NoticeBar/NoticeBar" />
