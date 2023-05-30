# List 列表

## 介绍

列表、列表项

备注： 列表暂未实现

## 使用指南

文件中引入组件

```tsx
import React from 'react'
import { List } from 'hui-design'
const ListItem = List.Item

const Demo: React.FC = () => {
  return (
    <>
      <ListItem title='列表标题' description='描述信息' tips='提示信息' />
    </>
  )
}

export default Demo
```

代码示例

<<< src/pages/List/List.tsx#demo

## 参数

### ListItem

<auto-doc path="components/List/ListItem.tsx" />

<demo-phone page="/pages/List/List" />
