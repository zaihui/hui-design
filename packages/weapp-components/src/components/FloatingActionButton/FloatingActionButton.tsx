import React from 'react'
import { View } from '@tarojs/components'
import { pxTransform } from '@tarojs/taro'
import HuiIcon from '../Icon/Icon'
import { HIconType } from '../Icon/type'

export type HuiFloatingActionButtonPosition = {
  top?: number
  left?: number
} | {
  bottom?: number
  right?: number
}
export interface HuiFloatingActionButtonProps {
  /** 按钮图标(左侧) */
  prefixIcon?: HIconType
  /** 图标颜色 */
  iconColor?: string
  /** 按钮背景颜色 */
  color?: string
  style?: React.CSSProperties
  /** 按钮位置，定义坐标轴方向距离，上左/下右 */
  position?: HuiFloatingActionButtonPosition
  children?: React.ReactNode
}

const DEFAULT_COLOR = '#ff5152'
const COLOR_WHITE = '#fff'
const DEFAULT_POSITION = { right: 12, bottom: 58 }

const FloatingActionButton: React.FC<HuiFloatingActionButtonProps> = props => {
  const {
    prefixIcon,
    iconColor = COLOR_WHITE,
    style,
    color,
    position,
  } = props

  return (
    <View className='hui-floating-action-button'>
      <View
        className='hui-floating-action-button-container'
        style={{
          backgroundColor: color || DEFAULT_COLOR,
          ...(position || DEFAULT_POSITION),
          ...style,
        }}
      >
        <View
          className='button-content'
        >
          {prefixIcon && (
            <View>
              <HuiIcon
                name={prefixIcon}
                color={iconColor}
                style={{ marginRight: prefixIcon && props.children ? pxTransform(8) : undefined }}
                size={24}
              />
            </View>
          )}
          {props.children}
        </View>
      </View>
    </View>
  )
}

export default FloatingActionButton
