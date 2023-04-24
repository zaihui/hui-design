# Input

## 介绍

文本输入框

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiInput } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <HuiInput
    label='姓名'
    // value
    type='text'
    placeholder='请填写姓名'
    arrow
    errorMsg='error msg'
    focus
    // disabled
    adjustPosition
    maxLength={140}
    divider
    onlyClick
    confirmType
    onClick={() => {}}
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

### Input
<auto-doc path="components/Input/Input.tsx" />

<demo-phone page="/pages/Input/Input" />
