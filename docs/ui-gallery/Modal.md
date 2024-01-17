# Modal 模态窗

## 介绍

模态窗，基于 Popup 组件封装了带标题和关闭按钮的容器，目前仅支持从底部弹出

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiModal, HuiListItem } from '@zaihui/hui-design'

const Demo: React.FC = () => {
  const [v1, setV1] = useState(false)

  return (
    <View>
      <HuiListItem title='模态窗' onClick={() => setV1(true)}></HuiListItem>
      <HuiModal
        title='标题'
        visible={v1}
        onClose={() => setV1(false)}
        contentStyle={{ padding: '50px', textAlign: 'center' }}
      >
        内容
      </HuiModal>
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
