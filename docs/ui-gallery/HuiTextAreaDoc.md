# TextArea

## 介绍

文本域输入

## 使用指南

文件中引入组件

```jsx
import React from 'react'
import { HuiTextArea } from '@zaihui/hui-design'

const Demo: React.FC => () => (
  <HuiTextArea
    upperLimit={50}
    showConfirmBar
    disableDefaultPadding
    autoHeight={false}
    // value
    placeholderText='备注'
    // disabled
    adjustPosition
    maxLength={140}
    showDivide
    onlyClick
    confirmType
    onLineChange={() => {}}
    onInput={() => {}}
    onFocus={() => {}}
    onBlur={() => {}}
    onConfirm={() => {}}
    onKeyboardHeightChange={() => {}}
  />
)

export default Demo
```

需要注意的是，为了修复频繁输入空格和长按删除操作是产生的闪烁 bug，textarea 使用的是原生小程序组件进行了封装，所以这需要在使用项目中时进行以下配置设置：

### 在 Taro 的 config 中配置

```jsx
const config = {
  copy: {
    patterns: [
      {
        from: 'node_modules/@zaihui/hui-design/lib/miniapp/',
        to: 'dist/miniapp/', // dist 为自己的构建文件夹，其他路径不可修改
      },
    ],
  },
}
```

### 在 app.config.ts 中配置

```jsx
const {
  nativeComponentConfig,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@zaihui/hui-design/lib/nativeComponentsConfig')

export default = {
  usingComponents: {
    ...nativeComponentConfig,
  },
}
```

## 参数

### TextArea

<auto-doc path="components/TextArea/TextArea.tsx" />

<demo-phone page="/pages/TextArea/TextArea" />
