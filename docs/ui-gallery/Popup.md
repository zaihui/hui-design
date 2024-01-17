# Popup 弹窗层

## 介绍

弹窗层，提供一个基本的弹窗容器，可承载各种提示、操作内容。

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiPopup, HuiListItem } from '@zaihui/hui-design'

const Demo: React.FC = () => {
  const [v1, setV1] = useState(false)

  return (
    <View>
      <HuiListItem title='弹窗层' onClick={() => setV1(true)}></HuiListItem>
      <HuiPopup visible={v1} onClose={() => setV1(false)} style={{ padding: '30px 50px' }}>
        内容
      </HuiPopup>
    </View>
  )
}

export default Demo
```

代码示例

<<< src/pages/Popup/Popup.tsx#demo

## 参数

<auto-doc path="components/Popup/Popup.tsx" />

<demo-phone page="/pages/Popup/Popup" />
