# Select 模态选择器

## 介绍

模态选择器，从底部弹出的选择器，支持二级菜单、多选、异步拉取选项等功能。

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiSelect, HuiListItem } from '@zaihui/hui-design'

const Demo: React.FC = () => {
  const [v1, setV1] = useState(false)

  return (
    <View>
      <HuiListItem title='单选' onClick={() => setV1(true)}>
      </HuiListItem>
      <HuiSelect
        visible={v1}
        title='这是个标题'
        level={1}
        options={data}
        onConfirm={v => setV1(false)}
        onClose={() => setV1(false)}
      ></HuiSelect>
    </View>
  )
}

export default Demo
```

代码示例

<<< src/pages/Select/Select.tsx#demo

## 参数

<auto-doc path="components/Select/Select.tsx" />

<demo-phone page="/pages/Select/Select" />
