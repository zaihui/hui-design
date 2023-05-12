import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'

export interface HuiActionSheetProps {
  className?: string
  style?: React.CSSProperties
  /** 关闭ActionSheet的回调 */
  onClose?: (event?: CommonEvent) => void
  /** 是否展示ActionSheet */
  visible?: boolean
  /** 标题 */
  title?: React.ReactNode
  /** 取消按钮的文案 */
  cancelText?: React.ReactNode
  children?: React.ReactNode
}

const handleTouchMove = (e: CommonEvent) => {
  e.stopPropagation()
  e.preventDefault()
}

const prefix = 'hui-action-sheet'
const HuiActionSheet: React.FC<HuiActionSheetProps> = props => {
  const {
    className = '',
    style,
    onClose,
    visible = false,
    title,
    cancelText = '取消',
    children,
  } = props

  const [isOpened, setIsOpened] = useState(visible)
  useEffect(() => {
    setIsOpened(visible)
    if (!visible) {
      doClose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const rootClass = cx(className, prefix, {
    [`${prefix}-active`]: isOpened,
  })

  const doClose = (e?: CommonEvent) => {
    if ('visible' in props && typeof onClose === 'function') {
      onClose(e)
    }
  }

  const handleClose = e => {
    setIsOpened(false)
    doClose(e)
  }

  return (
    <View
      className={rootClass}
      style={style}
      onTouchMove={handleTouchMove}
    >
      <View onClick={handleClose} className={`${prefix}-mask`} />
      <View className={`${prefix}-container`}>
        <View className={`${prefix}-content`}>
          {title && <View className={`${prefix}-header`}>{title}</View>}
          <View className={`${prefix}-body`}>{children}</View>
        </View>
        {cancelText && (
          <View className={`${prefix}-footer`} onClick={handleClose}>
            {cancelText}
          </View>
        )}
      </View>
    </View>
  )
}

export default HuiActionSheet
