# EditorDisplay 组件

## 介绍

图文展示基本组件（内置有仅图片、图片+文字两种样式，可自定义）

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { EditorDisplay } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <>
    <EditorDisplay type='noContent' image=''>
      demo1
    </EditorDisplay>
    <EditorDisplay type='withContent' image=''>
      demo2
    </EditorDisplay>
    // 支持自定义内部样式
    <EditorDisplay image='' type='' headerContent='' footerContent=''>
      demo3
    </EditorDisplay>
  </>
)

export default Demo
```

代码示例

<<< src/pages/EditorDisplay/EditorDisplay.tsx#demo

## 参数

### EditorDisplay

<auto-doc path="components/EditorDisplay/EditorDisplay.tsx" />

<demo-phone page="/pages/EditorDisplay/EditorDisplay" />
