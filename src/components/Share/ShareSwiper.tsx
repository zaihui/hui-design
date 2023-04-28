import {
  Block,
  Swiper,
  SwiperItem,
  View,
} from '@tarojs/components'
import React, { FunctionComponent, useState } from 'react'
import { pxTransform } from '../../utils'

import HIcon from '../Icon'
import HImage from '../Image'

import './Share.scss'

interface ShareSwiperProps {
  urlList: string[]
  style?: React.CSSProperties
  className?: string
  handleChange: (index: number) => void
}
const ShareSwiper: FunctionComponent<ShareSwiperProps> = ({
  urlList = [],
  style,
  className = '',
  handleChange,
}) => {
  const [current, setCurrent] = useState<number>(0)

  const onChange = (index: number) => {
    setCurrent(index)
    handleChange(index)
  }

  return (
    <Swiper
      style={style}
      previousMargin={pxTransform(24)}
      nextMargin={pxTransform(24)}
      className={`share-swiper ${className}`}
    >
      {urlList.map((item, index) => (
        <SwiperItem key={index} className='swiper-item' onClick={() => onChange(index)}>
          <View
            className={`item ${index === current ? 'current' : ''}`}
          >
            <HImage className='post-image' src={item} width={260} height={360} mode='aspectFill' />
            {index === current && (
              <Block>
                <View className='icon'>
                  <HIcon name='024-check' color='#fff' size={16} />
                </View>
                <View className='triangle' />
              </Block>
            )}
          </View>
        </SwiperItem>
      ))}
    </Swiper>
  )
}
export default ShareSwiper
