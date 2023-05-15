# 筛选栏Filter

## 介绍

下拉菜单列表

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { View } from '@tarojs/components'
import { HuiFilter } from '@zaihui/hui-design'


const Demo: React.FC = () => {
  const options = [{ value: '1', text: '再惠' }, { value: '2', text: '麒麟' }]
  return (
      <>
        <HuiFilter menuConfig={
          {
            className: 'hui-menu-xxx',
            menuItems: [
              {
                title: '自定义title',
                children: ({ hideMenu }) => <View>
                  <HuiButton onClick={() => hideMenu()}>ok</HuiButton>
                </View>,
              }, {
                options,
                value: options[0].value,
              }],
          }
        }
        />
      </>
    )
}

export default Demo
```

代码示例

## 参数

<auto-doc path="components/Filter/Filter.tsx" />

<demo-phone page="/pages/Filter/Filter" />
