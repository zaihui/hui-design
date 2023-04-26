import React, { useContext, forwardRef, useImperativeHandle } from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

import CheckboxGroupContext from './context'
import HuiIcon from '../Icon/Icon'
import { pxTransform } from '../../utils'

const DEFAULT_ICON_COLOR = '#ed3737'
const DEFAULT_ICON_SIZE = 20

export interface HuiCheckboxProps extends ViewProps {
  value: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否被选中 */
  checked?: boolean
  /** 选中状态的颜色 */
  color?: string
  /** 自定义大小 */
  size?: number
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

export interface HuiCheckboxRef {
  toggle: () => void
}
const HuiCheckbox: React.ForwardRefRenderFunction<
  HuiCheckboxRef,
  HuiCheckboxProps
> = (props, ref) => {
  const {
    value,
    size = DEFAULT_ICON_SIZE,
    disabled = false,
    checked = false,
    color = DEFAULT_ICON_COLOR,
    style,
    className = '',
    children,
    onClick,
    ...rest
  } = props
  const context = useContext(CheckboxGroupContext)

  const hasChildren = !!children
  const finalDisabled = context?.disabled || disabled
  const toggle = () => {
    const beforeCheckedList = context?.checkedList ?? []
    const afterCheckedList = checked
      ? beforeCheckedList.filter(item => item !== value)
      : beforeCheckedList.concat(value)

    context?.onChange(afterCheckedList)
  }
  const handleClick = e => {
    e.stopPropagation()
    if (!finalDisabled) {
      toggle()
      onClick && onClick(e)
    }
  }

  useImperativeHandle(ref, () => ({
    toggle: () => {
      if (!finalDisabled) {
        toggle()
      }
    },
  }))

  return (
    <View
      style={style}
      ref={ref}
      className={cx(`hui-checkbox ${className}`, { 'disabled': finalDisabled })}
      onClick={handleClick}
      {...rest}
    >
      <View
        className={cx('hui-checkbox-icon', { 'unchecked': !checked })}
        style={{
          width: pxTransform(size),
          height: pxTransform(size),
        }}
      >
        <HuiIcon
          name='009-checkbox'
          size={size}
          color={checked ? color : 'transparent'}
        />
      </View>
      {hasChildren && (
        <View className='hui-checkbox-content'>
          {children}
        </View>
      )}
    </View>
  )
}

export default forwardRef(HuiCheckbox)
