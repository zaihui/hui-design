import React from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'

import { pxTransform, addOpacityToHexColor } from '../../utils'

export interface HuiTagProps {
  /** 标签尺寸 */
  size?: 'medium' | 'large'
  /** 标签类型: 实心、空心、半透明, 默认实心 */
  type?: 'solid' | 'hollow' | 'semitransparent'
  /** 标签颜色 */
  color?: string
  /** 标签圆角 */
  radius?: number
  style?: React.CSSProperties
  /** 点击事件 */
  onClick?: (e: ITouchEvent) => void
  children?: React.ReactNode
  className?: string
}

const HuiTag: React.FC<HuiTagProps> = props => {
  const {
    size = 'medium',
    type = 'solid',
    color = '',
    radius,
    children,
    style,
    className = '',
    onClick,
  } = props

  const getTagBackground = () => {
    if (type === 'semitransparent') {
      return addOpacityToHexColor(color, 0.2)
    } else if (type === 'solid') {
      return color
    }
    return undefined
  }

  const getTagBorderColor = () => {
    if (type === 'semitransparent') {
      return 'transparent'
    } else if (type === 'solid') {
      return color
    }
    return addOpacityToHexColor(color, 0.3)
  }

  const tagStyle = {
    background: getTagBackground(),
    borderColor: getTagBorderColor(),
    color: ['hollow', 'semitransparent'].includes(type) ? color : undefined,
    borderRadius: radius && `${pxTransform(radius)}`,
    ...style,
  }

  const handleClick = (e: ITouchEvent) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <View
      className={`hui-tag ${size} ${type} ${className}`}
      style={tagStyle}
      onClick={handleClick}
    >
      <View
        className={cx(`tag-text ${size}-text`)}
      >
        {children}
      </View>
    </View>
  )
}

export default HuiTag
