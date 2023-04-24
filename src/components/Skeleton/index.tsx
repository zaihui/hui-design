import React from 'react'
import { View } from '@tarojs/components'

import { pxTransform } from '../../utils'

interface HuiSkeletonProps {
  type?: 'vertical' | 'horizontal'
  avatar?: boolean | {
    size?: number
    shape?: 'square' | 'circle'
  }
  title?: boolean | {
    width?: number | string
  }
  paragraph?: boolean | {
    rows?: number
    width?: (number | string)[]
  }
  style?: React.CSSProperties
  className?: string
}

const DEFAULT_AVATAR_SIZE = 80
const DEFAULT_AVATAR_SHAPE = 'square'
const DEFAULT_TITLE_WIDTH = '50%'
const DEFAULT_PARAGRAPH_ROWS = 3
const DEFAULT_PARAGRAPH_WIDTH = ['100%', '100%', '70%']

const HuiSkeleton: React.FC<HuiSkeletonProps> = props => {
  const { type, avatar, title, paragraph, className = '', style } = props

  const avartarSize = typeof avatar === 'object'
    ? avatar.size ?? DEFAULT_AVATAR_SIZE
    : DEFAULT_AVATAR_SIZE
  const avatarShap = typeof avatar === 'object'
    ? avatar.shape ?? DEFAULT_AVATAR_SHAPE
    : DEFAULT_AVATAR_SHAPE
  const titleWidth = typeof title === 'object'
    ? title.width ?? DEFAULT_TITLE_WIDTH
    : DEFAULT_TITLE_WIDTH
  const paragraphRows = typeof paragraph === 'object'
    ? paragraph.rows ?? DEFAULT_PARAGRAPH_ROWS
    : DEFAULT_PARAGRAPH_ROWS
  const paragraphWidth = typeof paragraph === 'object'
    ? paragraph.width || DEFAULT_PARAGRAPH_WIDTH
    : DEFAULT_PARAGRAPH_WIDTH
  const paragraphs = Array(paragraphRows).fill(0)
    .map((_, index) => ({ width: paragraphWidth[index] || '100%' }))
    .map(({ width }) => ({
      width: typeof width === 'number'
        ? pxTransform(width)
        : width,
    }))

  const hasAvatar = !!avatar
  const hasTitle = !!title
  const hasParagraph = !!paragraph

  return (
    <View
      style={style}
      className={`hui-skeleton ${type} ${className}`}
    >
      {hasAvatar && (
        <View
          className={`hui-skeleton-avatar ${avatarShap}`}
          style={{
            width: type === 'vertical' ? '100%' : pxTransform(avartarSize),
            height: pxTransform(avartarSize),
          }}
        />
      )}
      {(hasTitle || hasParagraph) && (
        <View className={`hui-skeleton-content ${hasAvatar ? 'has-avatar' : ''}`}>
          {hasTitle && (
            <View
              className='hui-skeleton-title'
              style={{
                width: typeof titleWidth === 'number'
                  ? pxTransform(titleWidth)
                  : titleWidth,
              }}
            />
          )}
          {hasParagraph && (
            <View className='hui-skeleton-paragraph-content'>
              {paragraphs.map(({ width }, index) => (
                <View
                  key={index}
                  className='hui-skeleton-paragraph'
                  style={{ width }}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  )
}

HuiSkeleton.defaultProps = {
  type: 'horizontal',
  title: true,
  avatar: true,
  paragraph: true,
}

export default HuiSkeleton
