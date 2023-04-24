# Mask 组件

## 介绍

应用于弹窗等交互模式上，点击遮罩层的背景关闭遮罩层

## 使用指南

引入组件

```jsx
import React from 'react'
import { HuiMask } from '@zaihui/hui-design'

const Demo: React.FC = () => {
  const [v1, setV1] = useState(false)

  return (
    <View>
      <HuiButton onClick={() => setV1(true)}>
        显示遮罩
      </HuiButton>
      <HuiMask visible={v1} onClick={() => setV1(false)} />
    </View>
  )
}

export default Demo
```

代码示例

<<< src/pages/Mask/Mask.tsx#demo

## 参数

<auto-doc path="components/Popup/Popup.tsx" />

<demo-phone page="/pages/Popup/Popup">
