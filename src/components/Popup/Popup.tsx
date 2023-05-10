import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import cx from 'classnames'
import React from 'react'

export interface HuiPopupProps extends ViewProps {
  // TODO: 由于组件会把rest参数传递给popup-content，这里如果直接用className，会导致不兼容
  // 后续通过一次大版本升级统一改过来，最外层的用className，内层的用contentClassName
  wapperClassName?: string
  // 兼容单词拼写错误
  wrapperClassName?: string
  contentClassName?: string
  // 修复历史遗漏问题，让Popup组件支持className的处理
  className?: string
  /** 是否展示 */
  visible: boolean
  /** 弹出位置 */
  position?: 'center' | 'top' | 'bottom' | 'right' | 'left'
  /** 是否点击遮罩层时触发onClose回调，默认开启 */
  maskClosable?: boolean
  style?: React.CSSProperties
  maskStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  /** 关闭回调 */
  onClose?: () => void
}

const Popup: React.FC<HuiPopupProps> = props => {
  const {
    wapperClassName = '',
    wrapperClassName = '',
    contentClassName = '',
    className = '',
    style,
    maskStyle,
    contentStyle,
    visible,
    position = 'center',
    maskClosable = true,
    onClose,
    children,
    ...rest
  } = props
  const handleClose = () => {
    if (!maskClosable || !onClose) {
      return
    }
    onClose()
  }

  const handleTouchMove = e => {
    e.stopPropagation()
  }

  return (
    <View
      style={style}
      className={cx(
        `hui-popup ${className || wrapperClassName || wapperClassName}`,
        { 'popup-container-active': visible },
        { 'no-animation': position === 'center' },
      )}
    >
      <View className='popup-mask' style={maskStyle} onTouchMove={handleTouchMove} onClick={handleClose} />
      <View
        className={`popup-content ${position} ${contentClassName}`}
        style={contentStyle}
        onTouchMove={handleTouchMove}
        {...rest}
      >
        {children}
      </View>
    </View>
  )
}

export default Popup
