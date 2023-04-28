import React from 'react'
import cx from 'classnames'
import { Block, View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

export interface HuiListItemProps extends ViewProps {
  avatar?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  tips?: React.ReactNode
  icon?: React.ReactNode
  border?: boolean
  className?: string
  style?: React.CSSProperties
}

const HuiListItem: React.FC<HuiListItemProps> = props => {
  const {
    avatar,
    title,
    description,
    tips,
    icon,
    border = true,
    children,
    className = '',
    style,
    ...rest
  } = props

  return (
    <View className={`hui-list-item ${className}`} style={style} {...rest}>
      <View className={cx('hui-list-item-inner-wrapper', { 'with-border': border })}>
        {!children
          ? (
            <Block>
              {avatar && <View className='hui-list-item-avatar'>{avatar}</View>}
              <View className='hui-list-item-content'>
                <View className='hui-list-item-title'>{title}</View>
                {description && <View className='hui-list-item-description'>{description}</View>}
              </View>
              {tips && (
                <View className='hui-list-item-tips'>
                  {tips}
                </View>
              )}
              {icon && (
                <View className='hui-list-item-icon'>
                  {icon}
                </View>
              )}
            </Block>
          )
          : children
        }
      </View>
    </View>
  )
}

export default HuiListItem
