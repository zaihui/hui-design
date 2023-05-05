import { View } from '@tarojs/components'
import { pxTransform } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

export interface HuiCardProps {
  /** 标题 */
  title: string
  /** 副标题 */
  subtitle?: React.ReactNode
  /** 索引图：头像/icon/logo、图片（居左上） */
  logo?: React.ReactNode
  /** 索引图尺寸在特殊情况支持自定义 */
  logoWidth?: number
  /** 索引图圆角在特殊情况支持自定义 */
  logoRadius?: number
  /** 辅助内容：文字、icon */
  assistTip?: React.ReactNode
  /** 内容 */
  content?: React.ReactNode
  /** 底部操作 */
  actions?: React.ReactNode
  /** 自定义卡片样式 */
  style?: React.CSSProperties
  /** 辅助内容的点击函数 */
  onAssistTipClick?(): void
}

const HuiCard: React.FC<HuiCardProps> = props => {
  const {
    title,
    subtitle,
    logo,
    logoWidth = 36,
    logoRadius = 4,
    assistTip,
    content,
    actions,
    style,
    onAssistTipClick,
  } = props

  const [isHorizontal, setIsHorizontal] = useState(false)

  useEffect(() => {
    /** 当索引图大小超过 48px 时，顶部区域 Header 和 内容区域 Body 为水平展示 */
    if (logoWidth && logoWidth > 48) {
      setIsHorizontal(true)
    }
  }, [logoWidth])

  return (
    <View className='hui-card' style={style}>
      <View className='hui-card-header'>
        {logo && (
          <View
            className='hui-card-logo'
            style={{
              width: pxTransform(logoWidth),
              height: pxTransform(logoWidth),
              borderRadius: pxTransform(logoRadius),
            }}
          >
            {logo}
          </View>
        )}
        <View className='hui-card-header-right'>
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
        <View className='hui-card-body'>{content}</View>
      )}
      {actions && <View className='hui-card-footer'>{actions}</View>}
    </View>
  )
}

export default HuiCard
