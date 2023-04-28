# FloatingActionButton 组件

## 介绍

用于代表应用内最重要的操作

## 使用指南

引入组件

```jsx
import React from 'react'
import { FloatingActionButton } from '@zaihui/hui-design'

const Demo: React.FC = () => {
  return (
    <View>
      <HuiFAB
        prefixIcon='h203-takingpicturesfill'
        color={'#00C968'}
        position={{
          left: 12,
          bottom: 58,
        }}
      >
        {text}
      </HuiFAB>
    </View>
  )
}

export default Demo
```

代码示例

<<< src/pages/FloatingActionButton/FloatingActionButton.tsx#demo

## 参数

<auto-doc path="components/FloatingActionButton/FloatingActionButton.tsx" />

<demo-phone page="/pages/FloatingActionButton/FloatingActionButton">
