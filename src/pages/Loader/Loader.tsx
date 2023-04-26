import React from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import router from '@/router'

import './style.scss'

const LoaderPage: React.FC = () => (
  <View className='loader-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-05-25/hui-design-loading-21052501.png'
      title='加载Loading'
      desc='页面或局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑'
    />

    <View className='content'>
      <GroupSection title='加载类型'>
        <View className='row'>
          <HuiButton
            block
            type='secondary'
            onClick={() => {
              router.LoaderDetail.navigateTo({
                type: 'page',
              })
            }}
          >
            整页加载
          </HuiButton>
        </View>
        <View className='row'>
          <HuiButton
            block
            type='secondary'
            onClick={() => {
              router.LoaderDetail.navigateTo({
                type: 'module',
              })
            }}
          >
            局部加载
          </HuiButton>
        </View>
        <View className='row'>
          <HuiButton
            block
            type='secondary'
            onClick={() => {
              router.LoaderDetail.navigateTo({
                type: 'bottom',
              })
            }}
          >
            触底加载
          </HuiButton>
        </View>
      </GroupSection>
    </View>
  </View>
)

export default LoaderPage
