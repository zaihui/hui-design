import React, {
  useContext,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

import CheckboxGroupContext, { CheckboxValue } from './context'
import HuiIcon from '../Icon/Icon'
import { pxTransform } from '../../utils'

const DEFAULT_ICON_COLOR = '#ed3737'
const DEFAULT_ICON_SIZE = 20

export interface HuiCheckboxProps extends ViewProps {
  value: CheckboxValue
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

const prefix = 'hui-checkbox'
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

  // 由于未选中情况下增加了 1px 的边框导致看起来比选中的大一圈
  // 样式里给了 border-box 但是无效，因此这里使用这种方式
  const calcSize = useMemo(() => size - (checked ? 0 : 1), [size, checked])

  const toggle = () => {
    const beforeCheckedList = context?.checkedList ?? []
    const afterCheckedList = checked
      ? beforeCheckedList.filter((item) => item !== value)
      : beforeCheckedList.concat(value)

    context?.onChange(afterCheckedList)
  }
  const handleClick = (e) => {
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
      className={cx(`${prefix} ${className}`, { disabled: finalDisabled })}
      {...rest}
    >
      <View
        className={cx(`${prefix}-icon`, { unchecked: !checked })}
        style={{
          width: pxTransform(calcSize),
          height: pxTransform(calcSize),
        }}
      >
        <HuiIcon
          name='009-checkbox'
          size={calcSize}
          color={checked ? color : 'transparent'}
        />
      </View>
      {hasChildren && (
        <View onClick={handleClick} className={`${prefix}-content`}>
          {children}
        </View>
      )}
      <View className={`${prefix}-mask`} onClick={handleClick}></View>
    </View>
  )
}

export default forwardRef(HuiCheckbox)
