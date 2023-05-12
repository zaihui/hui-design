import React from 'react'
import { Image, Navigator, View } from '@tarojs/components'
import { NavigatorProps } from '@tarojs/components/types/Navigator'

export interface HuiGridItemProps extends NavigatorProps {
  image: string
  text: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const HuiGridItem: React.FC<HuiGridItemProps> = props => {
  const { image, text, style, className = '', ...rest } = props

  return (
    <Navigator
      className={`hui-grid-item ${className}`}
      hoverClass='none'
      style={style}
      {...rest}
    >
      <Image src={image} mode='aspectFit' className='grid-image'></Image>
      <View className='grid-text'>{text}</View>
    </Navigator>
  )
}

export default HuiGridItem
