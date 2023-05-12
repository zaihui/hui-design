import React from 'react'

export interface HuiRadioGroupContextProps {
  /** 禁用所有选择器 */
  disabled?: boolean
  onChange?: (v: React.ReactText) => void
}

const RadioGroupContext = React.createContext<HuiRadioGroupContextProps | null>(null)

export const HuiRadioGroupContextProvider = RadioGroupContext.Provider

export default RadioGroupContext
