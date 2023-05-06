/**
 * formStore 控制表单数据
 * 校验放到filed组件内部去做
 * 表单组件为受控，需要value - onChange
 */

import InstanceForm from './index'
import type { HuiFormProps } from './index'
import Item from './FormItem'

import useForm from './hooks/useForm'

import type { HuiFormItemProps } from './constants/formItem'

type InstanceFormType = typeof InstanceForm

interface FormInterface extends InstanceFormType {
  Item: typeof Item
}
(InstanceForm as FormInterface).Item = Item

const Instance = InstanceForm as FormInterface

export { useForm, HuiFormProps, HuiFormItemProps }

export default Instance
