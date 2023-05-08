# HighlightText 高亮文本

## 介绍
高亮组件内部的文本


## 使用指南

文件中引入组件

```jsx
import { HighlightText } from '@zaihui/hui-design'

const Demo: React.FC = () => (
  <View>
    <HighlightText keyword="技术" keywordStyle={{color:"blue"}}>
      再惠提供技术支持
    </HighlightText>
  </View>
)

export default Demo
```

代码示例

<<< src/pages/HighlightText/HighlightText.tsx#demo

## 参数

### HighlightText
<auto-doc path="components/HighlightText/HighlightText.tsx" />

<demo-phone page="/pages/HighlightText/HighlightText" />
