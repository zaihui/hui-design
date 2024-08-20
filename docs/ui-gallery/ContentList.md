# ContentList 内容列表

## 介绍

文字或图片列表

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { ContentList } from 'hui-design'

const { Item } = ContentList

const Demo: React.FC = () => {
  return (
    <>
      <ContentList>
        <Item label='标题文字' value='内容' />
      </ContentList>
    </>
  )
}

export default Demo
```

代码示例

<<< src/pages/ContentList/ContentList.tsx#demo

## 参数

### Item

<auto-doc path="components/ContentList/Item/index.tsx" />

<demo-phone page="/pages/ContentList/ContentList" />
