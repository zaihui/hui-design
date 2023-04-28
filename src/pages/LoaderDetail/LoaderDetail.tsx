import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { useReachBottom, useRouter } from '@tarojs/taro'

import HuiLoader from '@/components/Loader'

import './LoaderDetail.scss'

type LoaderType = 'page' | 'bottom' | 'module'
const LoaderDetail: React.FC = () => {
  const { q = '{}' } = useRouter().params
  const { type = 'page' } = JSON.parse(decodeURIComponent(q)) as { type: LoaderType }

  const [bottomLoading, setBottomLoading] = useState(false)

  useReachBottom(() => {
    if (type === 'bottom') {
      setBottomLoading(true)
      setTimeout(() => {
        setBottomLoading(false)
      }, 3000)
    }
  })

  return (
    <View className='loader-detail'>
      {type === 'page' && (
        <HuiLoader loading type='page' />
      )}
      {type === 'module' && (
        <View className='module-loader-demo'>
          <View className='top'>
            <HuiLoader loading type='module' />
          </View>
          <View className='middle' />
          <View className='bottom' />
        </View>
      )}
      {type === 'bottom' && (
        <View className='bottom-loader-demo'>
          <HuiLoader loading={bottomLoading} type='bottom'>
            <View className='bl-section top'><View className='inner'>页面内容</View></View>
            <View className='bl-section middle'><View className='inner'>页面内容</View></View>
            <View className='bl-section bottom'><View className='inner'>页面内容</View></View>
          </HuiLoader>
        </View>
      )}
    </View>
  )
}

export default LoaderDetail
