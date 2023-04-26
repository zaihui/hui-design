import React from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import router from '@/router'

import './DefaultPage.scss'

const DefaultPage: React.FC = () => (
    <View className='default-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-25/hui-design-empty-21052501.png'
        title='空状态页面Default Page'
        desc='当目前没有数据时，用于显式的用户提示或初始化场景时的引导创建流程，可自定义展示icon或图片'
      />

      <View className='content'>
        <GroupSection title='空状态类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                router.DefaultPageDetail.navigateTo({
                  type: 'noData',
                })
              }}
            >
              整页无数据
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                router.DefaultPageDetail.navigateTo({
                  type: 'noSearch',
                })
              }}
            >
              搜索无数据
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                router.DefaultPageDetail.navigateTo({
                  type: 'failed',
                })
              }}
            >
              加载失败
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                router.DefaultPageDetail.navigateTo({
                  type: 'custom',
                })
              }}
            >
              自定义样式
            </HuiButton>
          </View>
        </GroupSection>
      </View>
    </View>
)

export default DefaultPage
