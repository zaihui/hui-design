import React from 'react'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

import { HuiRadioGroupContextProvider } from './context'

export interface HuiRadioGroupProps extends ViewProps {
  /** 禁用所有选择器 */
  disabled?: boolean
  /** 子选项有变化时的回调函数 */
  onChange?: (v: string | number) => void
}

const defaultProps = {
  onChange: () => undefined,
}

const HuiRadioGroup: React.FC<HuiRadioGroupProps> = props => {
  const {
    className = '',
    onChange = defaultProps.onChange,
    disabled = false,
    children,
  } = props

  const onRadioChange = v => {
    onChange(v)
  }

  return (
    <HuiRadioGroupContextProvider
      value={{
        onChange: onRadioChange,
        disabled,
      }}
    >
      <View
        {...props}
        className={`hui-radio-group ${className}`}
      >
        {children}
      </View>
    </HuiRadioGroupContextProvider>
  )
}

export default HuiRadioGroup
