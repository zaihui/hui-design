import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './style.scss'

interface PageHeaderProps {
  image?: string
  title: string
  desc: string
}

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { image, title, desc } = props

  return (
    <View className='page-header'>
      <View className='title'>
        {image && (
          <Image
            style={{ width: Taro.pxTransform(33), height: Taro.pxTransform(33) }}
            src={image}
          />
        )}
        {title}
      </View>
      <View className='desc'>{desc}</View>
    </View>
  )
}

export default PageHeader
