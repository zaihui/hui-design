import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import HuiImage, { HuiImageProps } from '../../Image/Image'

export interface HuiContentListItemProps {
  label?: string | React.ReactNode
  value?: string | string[] | React.ReactNode
  /** 布局方式，左右 /上下 */
  type?: 'horizontal' | 'vertical'
  /** 是否长标签，仅在type='horizontal'有效 */
  longLabel?: boolean
  /** 图片属性 */
  imgStyle?: HuiImageProps
  className?: string
  style?: React.CSSProperties
}

const HuiContentListItem: React.FC<HuiContentListItemProps> = (props) => {
  const {
    label = '',
    value = '',
    type = 'horizontal',
    longLabel = false,
    imgStyle = {},
    className = '',
    style = {},
  } = props

  const handlePreViewImg = (urls: string[], url: string) => {
    Taro.previewImage({
      current: url,
      urls,
    })
  }

  const renderValue = (v: string | string[] | React.ReactNode) => {
    if (Array.isArray(v)) {
      return v.map((item) => (
        <HuiImage
          key={item}
          className='list-item-img'
          src={item}
          onClick={() => handlePreViewImg(v, item)}
          {...imgStyle}
        />
      ))
    }

    return v
  }

  return (
    <View
      className={`hui-content-list-item-${type} ${className}`}
      style={style}
    >
      <View className={`item-label${longLabel ? '-long' : ''}`}>{label}</View>
      <View
        className={`item-value${longLabel ? '-long' : ''}  ${
          Array.isArray(value) ? `img-content-${type}` : '-'
        }`}
      >
        {renderValue(value)}
      </View>
    </View>
  )
}

export default HuiContentListItem
