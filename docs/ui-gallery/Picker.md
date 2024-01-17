# Picker 组件

## 介绍

类似微信的 picker 组件，但使用 picker-view 重写了样式与用法

## 使用指南

文件中引入组件

```tsx
import React from 'react'
import { HuiPicker } from '@zaihui/hui-design'

const open3Columns = [[{ text: '第一列' }], [{ text: '第二列' }], [{ text: '第三列' }]]
const Demo: React.FC = () => (
  const [open3, setOpen3] = useState(false)
  <>
    <HuiPicker
      visible={open3}
      onClose={() => setOpen3(false)}
      confirmStyle={{ color: 'blue' }}
      columns={open3Columns}
      // 默认的各列选中项索引
      current={[0, 0, 0]}
      onConfirm={v => console.log(v)} // [0, 0, 0] 每列选中的索引
      onChange={(v, i) => Taro.showToast({ title: `你滚动了第${i + 1}列`, icon: 'none' })}
      title='三列picker'
    />
  </>
)

export default Demo
```

代码示例

<<< src/pages/Picker/Picker.tsx#demo

## 参数

### Picker

<auto-doc path="components/Picker/Picker.tsx" />

<demo-phone page="/pages/Picker/Picker" />
