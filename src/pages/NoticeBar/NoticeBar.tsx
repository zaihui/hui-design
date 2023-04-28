import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import NoticeBar from '@/components/NoticeBar'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import './NoticeBar.scss'

const singleText = '雨巷--戴望舒'
const multiText = '撑着油纸伞，独自彷徨在悠长、悠长又寂寥的雨巷 我希望逢着一个丁香一样的 结着愁怨的姑娘 她是有 丁香一样的颜色 丁香一样的芬芳 丁香一样的忧愁 在雨中哀怨 哀怨又彷徨'

const NoticeBarPage: React.FC = () => {
  const [visible, setVisible] = useState(true)
  return (
    <View className='notice-bar-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-30/hui-design-noticebar-21053001.png'
        title='通知Notice Bar'
        desc='用于页面中向用户显示的信息，可自定义是否手动关闭、是否滚动、跳转以及颜色等'
      />
      <View className='content'>
        <GroupSection title='通知类型'>
          <SubGroupSection title='基础类型'>
            <View className='row'>
              <NoticeBar>{singleText}</NoticeBar>
            </View>
            <View className='row'>
              <NoticeBar>{multiText}</NoticeBar>
            </View>
            <View className='row'>
              <NoticeBar hasIcon>{singleText}</NoticeBar>
            </View>
            <View className='row'>
              <NoticeBar hasIcon>{multiText}</NoticeBar>
            </View>
          </SubGroupSection>
          <SubGroupSection title='滚动类型'>
            <View className='row'>
              <NoticeBar type='marquee'>{singleText}</NoticeBar>
            </View>
            <View className='row'>
              <NoticeBar hasIcon type='marquee'>{multiText}</NoticeBar>
            </View>
          </SubGroupSection>
          <SubGroupSection title='手动关闭类型'>
            <View className='row'>
              <NoticeBar
                type='close'
                visible={visible}
                onClose={() => {
                  setVisible(false)
                  Taro.showToast({
                    title: '关闭',
                  })
                }
                }
              >
                {singleText}
              </NoticeBar>
            </View>
            <View className='row'>
              <NoticeBar
                type='close'
                onClose={() => {
                  Taro.showToast({
                    title: '关闭',
                  })
                }}
              >
                {multiText}
              </NoticeBar>
            </View>
          </SubGroupSection>
          <SubGroupSection title='可跳转类型'>
            <View className='row'>
              <NoticeBar
                type='more'
                onGotoMore={() => {
                  Taro.showToast({
                    title: '即将跳转…',
                  })
                }}
              >
                {singleText}
              </NoticeBar>
            </View>
            <View className='row'>
              <NoticeBar
                type='more'
                onGotoMore={() => {
                  Taro.showToast({
                    title: '即将跳转…',
                  })
                }}
              >
                {multiText}
              </NoticeBar>
            </View>
          </SubGroupSection>
        </GroupSection>
      </View>
    </View>
  )
}

export default NoticeBarPage
