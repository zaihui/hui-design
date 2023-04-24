# Switch 开关

## 介绍
开关组件

## 使用指南

```tsx
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { HuiSwitch } from '@zaihui/hui-design'

const Demo: React.FC = () => {
  const [checked, setChecked] = useState(false)
  return (
    <View>
      <Switch
        checked={checked}
        onChange={v => setChecked(v)}
      />
    </View>
  )
}

export default Demo
```

## 参数

### Switch
<auto-doc path="components/Switch/Switch.tsx" />

<demo-phone page="/pages/Switch/Switch" />
