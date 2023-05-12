import React from 'react'
import { View, Image } from '@tarojs/components'

import PageHeader from '@/demoComponents/PageHeader'

import './Layer.scss'

const LAYER_DESC_IMG = 'https://r.kezaihui.com/client/2021-05-31/hui-design-layer-demo-21053102.png'

interface SectionProps {
  title: string
  children?: React.ReactNode
}
const Section: React.FC<SectionProps> = props => {
  const { title, children } = props

  return (
    <View className='layer-desc-section'>
      <View className='title'>{title}</View>
      <View className='content'>{children}</View>
    </View>
  )
}

const Layer: React.FC = () => (
    <View className='layer-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-layer-21053101.png'
        title='页面层级Layer'
        desc='用于规范页面元素的所属层级、层级顺序及组合规范'
      />

      <View className='content'>
        <View className='image-container'>
          <Image className='layer-image' src={LAYER_DESC_IMG} />
        </View>
        <Section title='弹出层'>
          最上层，作为内容层和导航层的补充，用于承载弹窗通知、操作菜单、成功或加载中等状态的 Toast、表单报错提示等弹出内容Toast 相比弹窗和操作菜单层级更高
        </Section>
        <Section title='导航层'>
          位于内容层之上，在用户滑动内容层时可保持位置不动，通常用于承载导航栏等需要固定在页面的元素
        </Section>
        <Section title='内容层'>
          最下层，承载页面主要内容
        </Section>
      </View>
    </View>
)

export default Layer
