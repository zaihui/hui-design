import React from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'

import './Mask.scss'

export interface HuiMaskProps {
  // 遮罩是否显示
  visible: boolean
  // 遮罩层级
  zIndex?: number
  // 是否点击遮罩关闭
  closeble?: boolean
  // 动画时长，单位s
  duration?: string | number
  // 自定义样式
  style?: React.CSSProperties
  children?: React.ReactNode
  // 关闭回调
  onClose?: () => void
}

const HuiMask: React.FC<HuiMaskProps> = props => {
  const { visible, zIndex, closeble = true, duration, style, onClose, children } = props

  const handleClick = () => {
    if (!closeble || !onClose) {
      return
    }
    onClose()
  }

  return (
    <View
      onClick={handleClick}
      className={cx('.hui-mask', { '.hui-mask-visible': visible })}
      style={{ zIndex, transitionDuration: typeof (duration) === 'number' ? `${duration}s` : duration, ...style }}
    >
      {visible ? children : ''}
    </View>
  )
}

export default HuiMask
