import { View } from '@tarojs/components'
import cx from 'classnames'
import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { ITouchEvent } from '@tarojs/components/types/common'
import HuiIcon from '../Icon/Icon'
import { addOpacityToHexColor } from '../../utils'

const FONT_SIZE = 14
export interface HuiNoticeBarProps {
  /** 是否可见，默认可见 */
  visible?: boolean
  /** 通知类型：基础（默认）、可关闭、可跳转、走马灯 */
  type?: 'default' | 'close' | 'more' | 'marquee'
  /** 自定义颜色 */
  color?: string
  /** 是否显示喇叭icon */
  hasIcon?: boolean
  /** 走马灯滚动速度（仅当type为marquee） */
  speed?: number
  style?: React.CSSProperties
  className?: string
  /** 关闭的回调（仅当type为close） */
  onClose?: (e: ITouchEvent) => void
  /** 可跳转的回调（仅当type为more） */
  onGotoMore?: (e: ITouchEvent) => void
  children?: string
}

const NoticeBar: React.FC<HuiNoticeBarProps> = props => {
  const {
    speed = 80,
    visible = true,
    color = '',
    hasIcon = false,
    type = 'default',
    onGotoMore,
    onClose,
    style,
    className = '',
    children,
  } = props
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (type === 'marquee' && children) {
      setDuration(
        (Taro.getSystemInfoSync().windowWidth + children.toString().length * FONT_SIZE) / speed,
      )
    }
  }, [type, children, speed])

  const noticeBarStyle = {
    color,
    background: addOpacityToHexColor(color, 0.1),
    ...style,
  }

  const handleClose = (e: ITouchEvent) => {
    if (type === 'close' && onClose) {
      onClose(e)
    }
  }

  const handleGoToMore = (e: ITouchEvent) => {
    if (type === 'more' && onGotoMore) {
      onGotoMore(e)
    }
  }

  return (
    visible ? (
      <View
        className={cx(
          `hui-noticebar ${className}`,
          { marquee: type === 'marquee' },
        )}
        style={noticeBarStyle}
        onClick={handleGoToMore}
      >
        <View className='hui-noticebar-content'>
          {hasIcon && (
            <View className='hui-noticebar-content-icon'>
              <HuiIcon
                name='011-notice'
                size={16}
              />
            </View>
          )}
          <View className='hui-noticebar-content-text'>
            <View
              className={cx('hui-noticebar-content-inner', {
                'no-icon-width': !hasIcon && type !== 'marquee',
                'icon-width': hasIcon && type !== 'marquee',
                'max-width': type === 'default',
              })}
              style={{ animationDuration: `${duration}s` }}
            >
              {children}
            </View>
          </View>
        </View>
        {type === 'close' && (
          <View
            className='hui-noticebar-close'
            onClick={handleClose}
          >
            <HuiIcon
              name='006-close3'
              size={16}
            />
          </View>
        )}
        {type === 'more' && (
          <View className='hui-noticebar-more'>
            <HuiIcon
              name='012-arrowright'
              size={16}
            />
          </View>
        )}
      </View>
    ) : null
  )
}

export default NoticeBar
