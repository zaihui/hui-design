import React from 'react'
import { View } from '@tarojs/components'

import HuiText, { TextLevel } from '@/components/Text'
import PageHeader from '@/demoComponents/PageHeader'

import './Text.scss'

interface TextItemProps {
  text: string
  textLevel: TextLevel
}

const TextItem: React.FC<TextItemProps> = (props) => {
  const { text, textLevel } = props

  return (
    <View className='text-item'>
      <HuiText textLevel={textLevel}>{text}</HuiText>
    </View>
  )
}

const Text: React.FC = () => (
  <View className='text-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-05-31/hui-design-font-21053101.png'
      title='Typography 文字'
      desc='在整体UI视觉体系中，主要字体为 14 px。在视觉展现时对主、次、辅助、标题等类别的字体做统一的规划，提高字体应用的性价比，减少不必要样式'
    />
    <View className='content'>
      <View className='item-list'>
        <TextItem textLevel={TextLevel.One} text='一级文字 加粗 24px 34H' />
        <TextItem textLevel={TextLevel.One} text='一级文字 常规 24px 34H' />
        <TextItem textLevel={TextLevel.Two} text='二级文字 加粗 20px 28H' />
        <TextItem textLevel={TextLevel.Two} text='二级文字 常规 20px 28H' />
        <TextItem textLevel={TextLevel.Three} text='三级文字 加粗 18px 25H' />
        <TextItem textLevel={TextLevel.Three} text='三级文字 常规 18px 25H' />
        <TextItem textLevel={TextLevel.Four} text='四级文字 加粗 16px 22H' />
        <TextItem textLevel={TextLevel.Four} text='四级文字 常规 16px 22H' />
        <TextItem textLevel={TextLevel.Five} text='五级文字 加粗 14px 20H' />
        <TextItem textLevel={TextLevel.Five} text='五级文字 常规 14px 20H' />
        <TextItem textLevel={TextLevel.Six} text='六级文字 加粗 13px 18H' />
        <TextItem textLevel={TextLevel.Six} text='六级文字 常规 13px 18H' />
        <TextItem textLevel={TextLevel.Seven} text='七级文字 加粗 12px 17H' />
        <TextItem textLevel={TextLevel.Seven} text='七级文字 常规 12px 17H' />
        <TextItem textLevel={TextLevel.Eight} text='八级文字 加粗 11px 15H' />
        <TextItem textLevel={TextLevel.Eight} text='八级文字 常规 11px 15H' />
        <TextItem textLevel={TextLevel.Nine} text='九级文字 加粗 9px 13H' />
        <TextItem textLevel={TextLevel.Nine} text='九级文字 常规 9px 13H' />
      </View>
    </View>
  </View>
)

export default Text
