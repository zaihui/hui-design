# Stepper 步进器

## 介绍

主要用于表单的数量加减

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiStepper } from '@zaihui/hui-design'

const Stepper: React.FC = () => (
  <HuiStepper
    className='custom'
    style={width: '100px'}
    type='number' // 'digit'
    value={10} // '10' number | string
    min={10}
    max={100}
    step={1}
    width={100}
    disabled={false}
    disabledInput={false}
    onChange={(value: number, e: CommonEvent) => {}}
    onBlur={(value: number, e: CommonEvent) => {}}
    onErrorInput={(errCb: InputError) => {}}
    hideMinus={true}
  />
)

export default Stepper
```

## 参数

### Stepper

<auto-doc path="components/Stepper/index.tsx" />

<demo-phone page="/pages/Stepper/Stepper" />
