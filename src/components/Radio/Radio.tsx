import React from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'
import { ViewProps } from '@tarojs/components/types/View'

import { pxTransform } from '../../utils'
import RadioGroupContext from './context'

const DEFAULT_ICON_SIZE = 20

export interface HuiRadioProps extends ViewProps {
  /** 根据value比较, 判断是否选中 */
  value: string | number
  /** 是否被选中 */
  checked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 选中的颜色 */
  color?: string
  /** icon外圈的尺寸 */
  size?: number
  className?: string
  style?: React.CSSProperties
}

const HuiRadio: React.FC<HuiRadioProps> = props => {
  const {
    className = '',
    style,
    value,
    checked = false,
    disabled = false,
    color,
    size = DEFAULT_ICON_SIZE,
    children,
    onClick,
  } = props

  const context = React.useContext(RadioGroupContext)
  const finalDisabled = context?.disabled || disabled

  const handleChange = v => {
    if (finalDisabled) {
      return
    }
    onClick?.(v)
    context?.onChange?.(v)
  }

  const hasChildren = typeof children !== 'undefined'
  const iconStyle = {
    width: pxTransform(size),
    height: pxTransform(size),
  }
  const iconInnerStyle = {
    backgroundColor: color,
    height: pxTransform(Math.round(size / 2)),
    width: pxTransform(Math.round(size / 2)),
  }

  return (
    <View
      {...props}
      className={cx(
        `hui-radio ${className || ''}`,
        { 'disabled': disabled },
      )}
      style={style}
      onClick={() => handleChange(value)}
    >
      <View
        className={cx('hui-radio-icon', { 'checked': checked, 'disabled': disabled })}
        style={iconStyle}
      >
        <View
          className='inner'
          style={iconInnerStyle}
        />
      </View>
      {hasChildren && (
        <View
          className='hui-radio-content'
        >
          {children}
        </View>
      )}
    </View>
  )
}

export default HuiRadio
