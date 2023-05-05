import Card from '@/components/Card'
import HuiIcon from '@/components/Icon'
import GroupSection from '@/demoComponents/GroupSection'
import PageHeader from '@/demoComponents/PageHeader'
import { View } from '@tarojs/components'
import { pxTransform } from '@tarojs/taro'
import React from 'react'

import './Card.scss'

const DETAIL = (
  <View className='detail'>
    详情
    <HuiIcon
      name='012-right'
      size={10}
      style={{ marginLeft: pxTransform(2) }}
    />
  </View>
)

const CONTENT = (
  <View className='card-content'>
    <View className='content-tip'>字段名：字段内容字段内容字段内容</View>
    <View className='content-tip'>
      字段名：字段内容字段内容字段内容字段内容
    </View>
    <View className='content-tip'>字段名：字段内容字段内容字段内容</View>
  </View>
)

const BUTTONS = (
  <View className='buttons'>
    <View className='white-button button'>按钮</View>
    <View className='primary-button button'>按钮</View>
  </View>
)

const TO_BE_CHECK = <View className='to-be-check'>待审核</View>

const LOGO = <View className='default-logo' />

const ASSIST = <View className='assist-text'>辅助文字</View>

const CardPage: React.FC = () => (
    <View className='card-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/image/2023-05-05/hui-design-card.jpg'
        title='卡片Card'
        desc='卡片以紧凑、结构化的方式呈现信息，将具有相关性的「内容」和「操作」集中展示在同一个平面上'
      />
      <View className='content'>
        <GroupSection title='Header 仅主标题'>
          <Card
            title='卡片标题'
            assistTip={DETAIL}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
          <Card
            title='卡片标题'
            logo={LOGO}
            assistTip={TO_BE_CHECK}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
          <Card
            title='卡片标题卡片标题卡片标题卡片标题卡片标题卡片标题卡最多两行最多两行'
            logo={LOGO}
            assistTip={TO_BE_CHECK}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
          <Card
            title='卡片标题'
            logo={LOGO}
            logoWidth={80}
            assistTip={ASSIST}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
        </GroupSection>
        <GroupSection title='Header 主标题+副标题'>
          <Card
            title='卡片标题'
            subtitle={ASSIST}
            assistTip={DETAIL}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
          <Card
            title='卡片标题'
            logo={LOGO}
            subtitle={ASSIST}
            assistTip={TO_BE_CHECK}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
          <Card
            title='卡片标题卡片标题卡片标题卡片标题卡片标题卡片标题卡最多两行最多两行'
            logo={LOGO}
            subtitle={ASSIST}
            assistTip={TO_BE_CHECK}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
          <Card
            title='卡片标题'
            logo={LOGO}
            subtitle={ASSIST}
            logoWidth={80}
            assistTip={ASSIST}
            content={CONTENT}
            actions={BUTTONS}
            style={{ marginBottom: pxTransform(10) }}
          />
        </GroupSection>
      </View>
    </View>
)

export default CardPage
