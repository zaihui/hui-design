import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'

export interface HuiSwitchProps {
  /** 是否禁用 */
  disabled?: boolean
  color?: string
  /** 是否选中 */
  checked?: boolean
  value?: boolean
  style?: React.CSSProperties
  className?: string
  /** 切换的回调函数 */
  onChange?: (value: boolean) => void
}

const defaultProps = {
  onChange: () => void 0,
}

const HuiSwitch: React.FC<HuiSwitchProps> = (props) => {
  const {
    disabled = false,
    color,
    style,
    checked = false,
    className = '',
    onChange = defaultProps.onChange,
  } = props

  const [_checked, setChecked] = useState<boolean>(checked)

  useEffect(() => {
    setChecked(Boolean(props.value))
  }, [props.value])

  return (
    <View
      className={cx(`hui-switch ${className}`, { checked: _checked, disabled })}
      style={{ backgroundColor: _checked ? color : '', ...style }}
      onClick={() => {
        if (disabled) return
        onChange?.(!_checked)
      }}
    >
      <View className={cx('hui-switch-dot-btn', { checked: _checked })} />
    </View>
  )
}

HuiSwitch.defaultProps = {
  disabled: false,
  checked: false,
}

export default HuiSwitch
