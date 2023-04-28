import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import PageHeader from '@/demoComponents/PageHeader'
import HuiDivider from '@/components/Divider'

import './Font.scss'

interface FontCardProps {
  text: string
  weight: 400 | 500 | 700
  weightName: string
}
const FontCard: React.FC<FontCardProps> = props => {
  const { text, weight, weightName } = props

  return (
    <View className='font-card'>
      <View className='fc-text' style={{ fontWeight: weight }}>
        {text}
      </View>
      <HuiDivider />
      <View className='fc-weight-text'>
        {weightName} {weight}
      </View>
    </View>
  )
}

interface FontItemProps {
  text: string
  size: number
}
const FontItem: React.FC<FontItemProps> = props => {
  const { text, size } = props

  return (
    <View className='font-item' style={{ fontSize: Taro.pxTransform(size) }}>
      {text}
    </View>
  )
}

const Font: React.FC = () => (
    <View className='font-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-font-21053101.png'
        title='文字Font'
        desc='在整体UI视觉体系中，主要字体为 14 pt。在视觉展现时对主、次、辅助、标题等类别的字体做统一的规划，提高字体应用的性价比，减少不必要样式'
      />
      <View className='content'>
        <View className='card-list'>
          <FontCard text='永' weight={400} weightName='Regular' />
          <FontCard text='永' weight={500} weightName='Medium' />
          <FontCard text='永' weight={700} weightName='Bold' />
        </View>
        <View className='item-list'>
          <FontItem size={20} text='大标题字号 Regular 20pt 24H' />
          <FontItem size={18} text='中标题字号 Regular 18pt 22H' />
          <FontItem size={16} text='标题字号 Regular 16pt 19H' />
          <FontItem size={14} text='大正文字号 Regular 14pt 17H' />
          <FontItem size={13} text='小正文字号 Regular 13pt 16H' />
          <FontItem size={12} text='大辅助文字号 Regular 12pt 14H' />
          <FontItem size={9} text='小辅助文字号 Regular 9pt 11H' />
        </View>
      </View>
    </View>
)

export default Font
