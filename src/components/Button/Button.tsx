import React from 'react'
import cx from 'classnames'
import { View, Button, Block } from '@tarojs/components'
import { ITouchEvent, BaseEventOrig } from '@tarojs/components/types/common'
import { ButtonProps } from '@tarojs/components/types/Button'

import { pxTransform } from '../../utils'
import HuiIcon from '../Icon/Icon'
import { HIconType } from '../Icon/type'

export interface HuiButtonProps {
  /** 按钮宽度 */
  width?: number
  /** 按钮类型: 主要按钮、次要按钮（幽灵按钮）、文字按钮 */
  type?: 'primary' | 'secondary' | 'text'
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 按钮颜色 */
  color?: string
  /** 按钮圆角类型 */
  radiusType?: 'default' | 'square' | 'no-radius'
  /** loading效果 */
  loading?: boolean
  /** 渐变按钮颜色, 仅在type为primary时可用, 优先级大于color */
  gradientColor?: string
  /** 按钮图标(左侧) */
  prefixIcon?: HIconType
  /** 按钮图标(右侧) */
  suffixIcon?: HIconType
  /** 块级元素样式 */
  block?: boolean
  style?: React.CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 按钮辅助文字，仅在large为large时可用 */
  extra?: string
  className?: string
  /** 点击事件 */
  onClick?: (e: ITouchEvent) => void
  /** 微信开放能力 */
  openType?: ButtonProps.OpenType
  onGetUserInfo?: (
    e: BaseEventOrig<ButtonProps.onGetUserInfoEventDetail>
  ) => void
  onGetPhoneNumber?: (
    e: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => void
  onChooseAvatar?: <T>(
    e: BaseEventOrig<T>
  ) => void
  onContact?: (e: BaseEventOrig<ButtonProps.onContactEventDetail>) => void
  onOpenSetting?: (
    e: BaseEventOrig<ButtonProps.onOpenSettingEventDetail>
  ) => void
  children?: React.ReactNode
}

const HuiButton: React.FC<HuiButtonProps> = props => {
  const {
    size = 'medium',
    type = 'primary',
    color = '',
    loading = false,
    gradientColor,
    block = false,
    disabled = false,
    onClick,
    width,
    radiusType = 'default',
    style,
    prefixIcon,
    suffixIcon,
    extra,
    openType,
    children,
    className = '',
    onGetUserInfo,
    onGetPhoneNumber,
    onContact,
    onOpenSetting,
    onChooseAvatar,
  } = props

  const buttonStyle = {
    width: width ? pxTransform(width) : undefined,
    background: type === 'secondary' ? undefined : gradientColor || color,
    borderColor: gradientColor ? 'unset' : color,
    color: ['secondary', 'text'].includes(type) ? color : undefined,
    ...style,
  }

  const handleClick = (e: ITouchEvent) => {
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  const iconSizeMap = {
    'small': 13,
    'medium': 14,
    'large': 16,
  }

  const buttonDisabled = disabled || loading

  const buttonContent = <Block>{
    prefixIcon
    && <HuiIcon
      name={prefixIcon}
      style={{ marginRight: pxTransform(8) }}
      size={iconSizeMap[size]}
    />
  }
    <View className={cx('content-wrapper', { hidden: loading })} >
      <View className='button-text'>{children}</View>
      {extra && <View className='extra'>{extra}</View>}
    </View>
    {
      suffixIcon
      && <HuiIcon
        name={suffixIcon}
        style={{ marginLeft: pxTransform(8) }}
        size={iconSizeMap[size]}
      />
    }</Block >

  return (
    <Button
      openType={openType}
      onGetPhoneNumber={onGetPhoneNumber}
      onGetUserInfo={onGetUserInfo}
      onContact={onContact}
      onOpenSetting={onOpenSetting}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onChooseAvatar={onChooseAvatar}
      style={buttonStyle}
      hoverClass='hover'
      disabled={buttonDisabled}
      onClick={handleClick}
      className={cx(
        `hui-button ${size} ${type} radius-${radiusType} ${className}`,
        { disabled: buttonDisabled },
        { inline: !block },
      )}
    >
      {loading && <View className='loading-area'></View>}
      {buttonContent}
    </Button>
  )
}

export default HuiButton
