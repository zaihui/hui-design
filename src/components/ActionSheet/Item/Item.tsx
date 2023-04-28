import React from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'

export interface HuiActionSheetItemProps {
  onClick?: (event?: CommonEvent) => void
  className?: string
  style?: React.CSSProperties
  /** 是否有点击效果（点击后背景会变灰） */
  hasActive?: boolean
  /** 禁用状态 */
  disabled?: boolean
  children?: React.ReactNode
}

const prefix = 'hui-action-sheet'
const Item: React.FC<HuiActionSheetItemProps> = props => {
  const {
    onClick,
    className,
    hasActive = true,
    disabled = false,
    style,
    children,
  } = props

  const rootClass = cx(
    `${prefix}-item`,
    className,
    {
      [`${prefix}-item-has-active`]: hasActive && !disabled,
      [`${prefix}-item-disabled`]: disabled,
    },
  )

  const handleClick = e => {
    if (typeof onClick === 'function' && !disabled) {
      onClick(e)
    }
  }

  return (
    <View
      onClick={handleClick}
      className={rootClass}
      style={style}
    >
      {children}
    </View>
  )
}

export default Item
