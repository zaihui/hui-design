import React, { useEffect, useState } from 'react'
import { CheckboxGroupContextProvider, CheckboxValue } from './context'

export interface HuiCheckboxGroupProps {
  /** 选中的checkbox值 */
  value?: CheckboxValue[]
  /** 选中的checkbox有变化时候的回调 */
  onChange: (checkedList: CheckboxValue[]) => void
  /** 是否禁用所有子checkbox */
  disabled?: boolean
  children?: React.ReactNode
}
const HuiCheckboxGroup: React.FC<HuiCheckboxGroupProps> = (props) => {
  const { value, onChange, disabled = false } = props
  const [checkedList, setCheckedList] = useState<CheckboxValue[]>([])

  useEffect(() => {
    if (value) {
      setCheckedList(value)
    }
  }, [value])

  const handleChange = (checkedValues: CheckboxValue[]) => {
    if (!disabled) {
      setCheckedList(checkedValues)
      onChange(checkedValues)
    }
  }

  return (
    <CheckboxGroupContextProvider
      value={{
        onChange: handleChange,
        disabled,
        checkedList,
      }}
    >
      {props.children}
    </CheckboxGroupContextProvider>
  )
}

export default HuiCheckboxGroup
