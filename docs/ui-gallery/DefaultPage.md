# DefaultPage 组件

## 介绍

缺省页基本组件（内置有没找到、无数据、加载失败三种样式，可自定义）

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiDefaultPage } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <>
    <HuiDefaultPage type='noData' visible>demo1</HuiDefaultPage>
    <HuiDefaultPage type='noSearch' visible>demo2</HuiDefaultPage>
    <HuiDefaultPage type='failed' visible>demo3</HuiDefaultPage>
    // 支持自定义内部样式
    <HuiDefaultPage
      description=''
      info=''
      buttonText=''
      buttonProps={}
      imageIcon={<Icon />}
      visible
    >demo3
    </HuiDefaultPage>
  </>
)

export default Demo
```

代码示例

<<< src/pages/DefaultPage/DefaultPage.tsx#demo

## 参数

### DefaultPage

<auto-doc path="components/DefaultPage/DefaultPage.tsx" />

<demo-phone page="/pages/DefaultPage/DefaultPage " />
