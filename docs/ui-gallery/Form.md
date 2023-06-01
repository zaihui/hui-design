# Form 表单

## 介绍

具有基础的提交验证功能，默认会给 FormItem 的 children 绑定上 value 和 onChange 方法去触发表单数据的变更事件，同时也可以自定义表单 change 的逻辑。

## 使用指南

文件中引入组件

```jsx
import { HuiForm, HuiInput, useForm } from '@zaihui/hui-design'

const HuiFormItem = HuiForm.item

const Demo: React.FC = () => {
  const [form] = useForm()

  return (
    <View>
      <HuiForm form={form}>
        <HuiFormItem label='选项1'>
          <HuiInput divider={false} />
        </HuiFormItem>
      </HuiForm>
    </View>
  )
}

export default Demo
```

代码示例

<<< src/pages/Form/Form.tsx#demo

## 参数

### Form

<auto-doc path="components/Form/Form.tsx" />

### FormItem

<auto-doc path="components/Form/FormItem/index.tsx" />

### FieldContext

<auto-doc path="components/Form/index.tsx" />

<demo-phone page="/pages/Form/Form" />
