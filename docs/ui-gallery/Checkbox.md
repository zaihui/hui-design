# Checkbox 多选框

## 介绍

多选框

## 使用指南

```tsx
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { HuiCheckbox } from '@zaihui/hui-design'

const HuiCheckboxGroup = HuiCheckBox.Group

const OPTIONS = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
]

const Demo: React.FC = () => {
  const [checkedList, setCheckedList] = useState([])

  return (
    <View>
      <HuiCheckboxGroup onChange={(values) => setCheckedList(values)}>
        {OPTIONS.map((option) => (
          <HuiCheckbox value={options.label}>{options.label}</HuiCheckbox>
        ))}
      </HuiCheckboxGroup>
    </View>
  )
}

export default Demo
```

代码示例

<<< src/pages/Checkbox/Checkbox.tsx#demo

## 参数

<auto-doc path="components/Checkbox/Checkbox.tsx" />

<demo-phone page="/pages/Checkbox/Checkbox" />
