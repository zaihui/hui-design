import React from 'react'
import { View } from '@tarojs/components'
import { pxTransform } from '../../utils/index'
import HuiImage from '../Image/Image'
import { AvatarType, AvatarSize } from './constants'

export interface HuiAvatarProps {
  /** 头像类型 */
  type?: AvatarType
  /** 头像大小 */
  size?: AvatarSize | number
  /** 边框颜色 */
  borderColor?: string
  /** 头像地址 */
  src: string
  className?: string
  style?: React.CSSProperties
}

const HuiAvatar: React.FC<HuiAvatarProps> = props => {
  const { type, size = 'small', borderColor, src, className = '', style } = props
  // 部分ios中，当父容器的宽度/2的值为偶数或者是偶数.5时border显示不全
  const defaultStyle = {
    border: borderColor ? `${pxTransform(1.75)} solid ${borderColor}` : 'none',
  }
  const avatarSizeMap = type === 'square'
    ? {
      'small': 40,
      'medium': 60,
      'large': 80,
    }
    : {
      'small': 16,
      'medium': 24,
      'large': 36,
    }
  const avatarSize = avatarSizeMap[size] || size

  return (
    <View className={`hui-avatar ${type} ${className}`} style={{ ...defaultStyle, ...style }}>
      <HuiImage width={avatarSize} height={avatarSize} src={src} />
    </View>
  )
}

HuiAvatar.defaultProps = {
  type: 'circle',
  size: 'small',
}

export default HuiAvatar
