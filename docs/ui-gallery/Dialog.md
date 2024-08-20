# Dialog 组件

## 基本用法

```tsx
import { useState } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { HuiDialog } from '@zaihui/hui-design'

const Demo = () => {
  const [visible, setVisible] = useState(false)
  return (
    <View>
      <Button>打开弹窗</Button>
      <HuiDialog
        visible={visible}
        title='测试标题'
        content='这是一段内容'
        renderFooter={(
          <Button>确定</Button>
        )}
        onClose={() => }
      />
    </View>
  )
}

export default Demo
```

## 代码示例

<<< src/pages/ActionSheet/ActionSheet.tsx#demo

## 参数

### Dialog

<auto-doc path="components/Dialog/Dialog.tsx" />
<demo-phone page="/pages/Dialog/Dialog.tsx" />
