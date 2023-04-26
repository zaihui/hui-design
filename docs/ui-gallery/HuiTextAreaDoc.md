# TextArea

## 介绍

文本域输入

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiTextArea } from '@zaihui/hui-design'

const Demo: React.FC => () => (
  <HuiTextArea
    upperLimit={50}
    showConfirmBar
    disableDefaultPadding
    autoHeight={false}
    // value
    placeholderText='备注'
    focus
    // disabled
    adjustPosition
    maxLength={140}
    showDivide
    onlyClick
    confirmType
    onLineChange={() => {}}
    onInput={() => {}}
    onFocus={() => {}}
    onBlur={() => {}}
    onConfirm={() => {}}
    onKeyboardHeightChange={() => {}}
  />
)

export default Demo
```

需要注意的是，并没有迁移所有的 input 的可选项，以下简单罗列下未定义的一些props：

- `placeholderStyle`
- `placeholderClass`、
- `cursorSpacing`
- `autoFocus`、
- `cursor`
- `selectionStart`
- `selectionEnd`
- `holdKeyboard`
- 等等

## 参数

### TextArea
<auto-doc path="components/TextArea/TextArea.tsx" />

<demo-phone page="/pages/TextArea/TextArea" />
