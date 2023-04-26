import React from 'react'
import { View, Image } from '@tarojs/components'

import { pxTransform } from '../../utils'

import HuiIcon from '../Icon/Icon'

export interface HuiDialogProps {
  /** 是否显示 */
  visible: boolean
  /** 顶部图片 */
  image?: string
  /**
   * @deprecated
   * 是否展示icon区域（已废弃，可直接通过renderIcon prop控制是否展示）
   * */
  showIcon?: boolean
  /** 自定义弹窗顶部图标内容 */
  renderIcon?: JSX.Element
  /** 弹窗标题 */
  title?: React.ReactNode
  /** 弹窗正文内容 */
  content?: React.ReactNode
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean
  /** 是否可关闭 */
  closable?: boolean
  /** 关闭按钮类型 */
  closeType?: 'top' | 'bottom'
  /**
   * @deprecated
   * 是否展示底部按钮区域（已废弃，可直接通过renderFooter prop控制是否展示）
   * */
  showFooter?: boolean
  /** 自定义footer的内容 */
  renderFooter?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  /** 关闭事件 */
  onClose: () => void
}

const defaultProps = {
  onClose: () => void 0,
}

const Dialog: React.FC<HuiDialogProps> = props => {
  const {
    visible,
    image,
    title,
    content,
    closable,
    maskClosable,
    closeType,
    showIcon,
    showFooter,
    style,
    className = '',
    onClose = defaultProps.onClose,
  } = props

  const handleMaskClick = () => {
    if (maskClosable) {
      onClose()
    }
  }

  return (
    <View className={`hui-dialog ${visible ? 'visible' : ''} ${className}`} style={style}>
      <View className='hui-dialog-mask' onClick={handleMaskClick} />
      <View className='hui-dialog-wrapper'>
        <View className='hui-dialog-container'>
          {image && (
            <Image className='hm-image' src={image} mode='aspectFill' />
          )}

          {!image && (
            <View className='header'>
              {closable && closeType === 'top' && (
                <View className='close-btn-top' onClick={onClose}>
                  <HuiIcon
                    name='006-close3'
                    size={14}
                    style={{ position: 'relative', left: pxTransform(-5) }}
                  />
                </View>
              )}
            </View>
          )}

          {showIcon && !!props.renderIcon && (
            <View className='icon-area'>
              {props.renderIcon}
            </View>
          )}

          {title && (
            <View className='title-area'>
              {title}
            </View>
          )}

          {content && (
            <View className='content-area'>
              {content}
            </View>
          )}

          {showFooter && !!props.renderFooter && (
            <View className='footer-area'>
              {props.renderFooter}
            </View>
          )}
        </View>
        {closable && closeType === 'bottom' && (
          <View className='close-btn-bottom cross' onClick={onClose}>
            <HuiIcon name='005-close2' color='white' size={28} />
          </View>
        )}
      </View>
    </View>
  )
}

Dialog.defaultProps = {
  visible: false,
  showIcon: true,
  maskClosable: true,
  closable: true,
  closeType: 'top',
  showFooter: true,
}

export default Dialog
