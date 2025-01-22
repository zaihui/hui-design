import InstanceForm from './Form'
import type { HuiFormProps } from './Form'
import Item from './FormItem'

import useForm from './hooks/useForm'
import useWatch from './hooks/useWatch'

import type { HuiFormItemProps } from './constants/formItem'

type InstanceFormType = typeof InstanceForm

interface FormInterface extends InstanceFormType {
  Item: typeof Item
}

const Instance = InstanceForm as FormInterface

Instance.Item = Item

export { useForm, useWatch, HuiFormProps, HuiFormItemProps }

export default Instance
