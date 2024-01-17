import InstanceForm from './Form'
import type { HuiFormProps } from './Form'
import Item from './FormItem'

import useForm from './hooks/useForm'

import type { HuiFormItemProps } from './constants/formItem'

type InstanceFormType = typeof InstanceForm

interface FormInterface extends InstanceFormType {
  Item: typeof Item
}

const Instance = InstanceForm as FormInterface

Instance.Item = Item

export { useForm, HuiFormProps, HuiFormItemProps }

export default Instance
