# Radio 单选

## 介绍

单选组件

## 使用指南

```typescript
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { HuiRadio } from '@zaihui/hui-design'

const HuiRadioGroup = HuiRadio.Group

const OPTIONS = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
]

const Demo: React.FC = () => {
  const [checkedValue, setCheckedValue] = useState(null)

  return (
    <View>
      <HuiRadioGroup onChange={(v) => setCheckedValue(v)}>
        {OPTIONS.map((option) => (
          <HuiRadio value={option.value} checked={option.value === checkedValue}>
            {option.label}
          </HuiRadio>
        ))}
      </HuiRadioGroup>
    </View>
  )
}

export default Demo
```

## 参数

### Radio

<auto-doc path="components/Radio/Radio.tsx" />

### RadioGroup

<auto-doc path="components/Radio/Group.tsx" />

<demo-phone page="/pages/Radio/Radio" />
