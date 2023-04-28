import React from 'react'
import { View } from '@tarojs/components'

import { HIconType } from './type'
import { pxTransform } from '../../utils'
import './Icon.scss'

export interface HuiIconProps {
  /** 图标图案 */
  name: HIconType
  /** 图标颜色 */
  color?: string
  /** 图标大小 */
  size?: number
  /**
   * className前缀，用于第三方字体图标库
   * 比如想使用'fa fa-clock' 的图标，则 传入prefixClass='fa' value='clock'
   */
  prefixClass?: string
  style?: React.CSSProperties
  className?: string
  /** 点击事件 */
  onClick?: () => void
}

const HuiIcon: React.FC<HuiIconProps> = ({
  color,
  name,
  size = 14,
  onClick = () => void 0,
  style: newStyle,
  className = '',
  prefixClass,
}) => {
  const style = {
    color: color || 'inherit',
    fontSize: pxTransform(size),
    ...newStyle,
  }

  const iconClassName = prefixClass
    ? `${prefixClass} ${prefixClass}-${name} ${className}`
    : `hui-icons hui-icon-${name} ${className}`

  return (
    <View
      className={iconClassName}
      style={style}
      onClick={() => onClick()}
    />
  )
}

export default HuiIcon
