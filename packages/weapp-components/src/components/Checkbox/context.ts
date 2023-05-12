import React from 'react'

export type CheckboxValue = string | number
interface CheckboxGroupContextProps {
  /** 当前选中的checkbox value列表 */
  checkedList: CheckboxValue[]
  /** 选中的checkbox有变化时的回调 */
  onChange: (checkedList: CheckboxValue[]) => void
  /** 是否禁用所有子checkbox */
  disabled: boolean
}

const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextProps | null>(null)

export const CheckboxGroupContextProvider = CheckboxGroupContext.Provider

export default CheckboxGroupContext
