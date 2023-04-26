# Tooltip 文字提示

## 介绍
文字提示气泡框。默认展示1s后自动关闭；支持手动关闭；

## 使用指南

文件中引入组件

```jsx
import React, { useState } from 'react'
import { HuiTooltip, HuiButton } from '@zaihui/hui-design'

const TooltipSample: React.FC = () => {
  const [isShowTip, setTipShow] = useState(false)

  return(
    <HuiTooltip
      content='文字提示'
      placement='topLeft'
      visible={isShowTip}
      onClose={() => setTipShow(false)}
      closable
    >
        <HuiButton onClick={() => setTipShow(true)}>tip</HuiButton>
    </HuiTooltip>
  )
}
```

代码示例

<<< src/pages/Tooltip/Tooltip.tsx#demo

## 参数

### Tooltip
<auto-doc path="components/Tooltip/Tooltip.tsx" />

<demo-phone page="/pages/Tooltip/Tooltip" />
