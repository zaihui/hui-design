# Search 搜索

## 介绍

小程序搜索组建，主要是组装了: HuiIcon、HuiButton、HuiInput

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiSearch } from '@zaihui/hui-design'

const SearchBar: React.FC = () => {
  const [val1, setVal1] = useState('')

  return (
    <HuiSearch
      theme='dark'
      value={val1}
      clearIcon={false}
      searchIcon={false}
      placeholder='请输入搜索内容'
      searchText='搜索'
      onInput={val => {
        setVal1(val as string)
      }}
      onSearch={val => {
        console.log(`您要搜索${val}`)
      }}
    />
  )
}


export default SearchBar
```

## 参数

### Stepper

<auto-doc path="components/Search/index.tsx" />

<demo-phone page="/pages/Search/Search" />
