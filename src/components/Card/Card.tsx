import { View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'

export interface HuiCardProps {
  /** 自定义卡片样式 */
  style?: React.CSSProperties
  /** 自定义卡片类名 */
  className?: string
  /** 标题 */
  title: string
  /** 副标题 */
  subtitle?: React.ReactNode
  /** 索引图：头像/icon/logo、图片（居左上） */
  logo?: React.ReactNode
  /** 索引图尺寸和圆角在特殊情况支持自定义 */
  logoStyle?: React.CSSProperties
  /** 辅助内容：文字、icon */
  assistTip?: React.ReactNode
  /** 内容 */
  content?: React.ReactNode
  /** 底部操作 */
  actions?: React.ReactNode
  /** 辅助内容的点击函数 */
  onAssistTipClick?(): void
}

const HuiCard: React.FC<HuiCardProps> = (props) => {
  const {
    style,
    className,
    title,
    subtitle,
    logo,
    logoStyle = { width: 36, height: 36, borderRadius: 4 },
    assistTip,
    content,
    actions,
    onAssistTipClick,
  } = props

  const [isHorizontal, setIsHorizontal] = useState(false)

  useEffect(() => {
    /** 当索引图大小超过 48px 时，顶部区域 Header 和 内容区域 Body 为水平展示 */
    if (logoStyle?.width && logoStyle.width > 48) {
      setIsHorizontal(true)
    }
  }, [logoStyle])

  return (
    <View className={cx('hui-card', className)} style={style}>
      <View className='hui-card-header'>
        {logo && (
          <View className='hui-card-logo' style={logoStyle}>
            {logo}
          </View>
        )}
        <View
          className={cx('hui-card-header-right', {
            'hui-card-header-right-top-aligned': logo && title && subtitle,
          })}
        >
          <View className='hui-card-header-right-top'>
            <View className='hui-card-title'>{title}</View>
            {assistTip && (
              <View
                className='hui-card-assist-tip'
                onClick={() => onAssistTipClick && onAssistTipClick()}
              >
                {assistTip}
              </View>
            )}
          </View>
          {subtitle && <View className='hui-card-subtitle'>{subtitle}</View>}
          {isHorizontal && content && (
            <View className='hui-card-body'>{content}</View>
          )}
        </View>
      </View>
      {!isHorizontal && content && (
        <View
          className={cx('hui-card-body', {
            'hui-card-body-only-title': title && !subtitle && !logo,
          })}
        >
          {content}
        </View>
      )}
      {actions && <View className='hui-card-footer'>{actions}</View>}
    </View>
  )
}

export default HuiCard
