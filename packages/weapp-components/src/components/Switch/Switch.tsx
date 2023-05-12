import React from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'

export interface HuiSwitchProps {
  /** 是否禁用 */
  disabled?: boolean
  color?: string
  /** 是否选中 */
  checked?: boolean
  style?: React.CSSProperties
  className?: string
  /** 切换的回调函数 */
  onChange?: (value: boolean) => void
}

const defaultProps = {
  onChange: () => void 0,
}

const HuiSwitch: React.FC<HuiSwitchProps> = props => {
  const {
    disabled = false,
    checked = false,
    color,
    style,
    className = '',
    onChange = defaultProps.onChange,
  } = props

  return (
    <View
      className={cx(`hui-switch ${className}`, { 'checked': checked, 'disabled': disabled })}
      style={{ backgroundColor: checked ? color : '', ...style }}
      onClick={() => onChange(!checked)}
    >
      <View className={cx('hui-switch-dot-btn', { 'checked': checked })} />
    </View>
  )
}

HuiSwitch.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => void 0,
}

export default HuiSwitch
