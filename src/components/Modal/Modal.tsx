import { View } from '@tarojs/components'
import React from 'react'

import { pxTransform } from '../../utils'
import HuiDivider from '../Divider'
import HuiIcon from '../Icon'
import HuiPopup, { HuiPopupProps } from '../Popup'

export interface HuiModalProps extends HuiPopupProps {
  /** 标题 */
  title: React.ReactNode
  contentClassName?: string
  /** children容器样式 */
  contentStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
  onClose?: () => void
}

const Modal: React.FC<HuiModalProps> = props => {
  const {
    title,
    contentClassName,
    contentStyle,
    style,
    className = '',
    children,
    onClose,
    ...rest
  } = props

  return (
    <HuiPopup
      position='bottom'
      onClose={onClose}
      className={className}
      style={{ borderRadius: `${pxTransform(20)} ${pxTransform(20)} 0 0`, ...style }}
      {...rest}
    >
      <View className='hui-modal'>
        <View className='hui-modal-header'>
          <View className='hui-modal-title'>{title}</View>
          <View className='hui-modal-close-icon' onClick={onClose}>
            <HuiIcon name='006-close3' size={18} color='inherit'></HuiIcon>
          </View>
        </View>
        <HuiDivider />
        <View className={`hui-modal-body ${contentClassName}`} style={contentStyle}>
          {children}
        </View>
      </View>
    </HuiPopup>
  )
}

export default Modal
