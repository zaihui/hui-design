# ActionSheet组件

## 介绍

ActionSheet基本组件

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiActionSheet } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <HuiActionSheet
    title='标题'
    visible={open}
    onClose={() => setOpen(false)}
  >
    <HuiActionSheet.Item hasActive={false} onClick={() => handleClick(1)}>
      操作一(点击没有active样式效果)
    </HuiActionSheet.Item>
    <HuiActionSheet.Item onClick={() => handleClick(2)}>
      操作二
    </HuiActionSheet.Item>
    <HuiActionSheet.Item onClick={() => handleClick(3)}>
      操作三
    </HuiActionSheet.Item>
  </HuiActionSheet>
)

export default Demo
```

代码示例

<<< src/pages/ActionSheet/ActionSheet.tsx#demo

## 参数

### ActionSheet
<auto-doc path="components/ActionSheet/ActionSheet.tsx" />

<demo-phone page="/pages/ActionSheet/ActionSheet" />
