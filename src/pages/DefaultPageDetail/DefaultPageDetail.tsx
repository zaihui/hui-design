import Taro, { useRouter } from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'

import HuiDefaultPage from '@/components/DefaultPage'
import HuiImage from '@/components/Image'

type DefaultPageType = 'noData' | 'noSearch' | 'failed' | 'custom'
const MOCK_IMAGE = 'https://r.kezaihui.com/client/2021-05-31/hui-design-image-4-21053101.png'

const DefaultPageDetail: React.FC = () => {
  const { q = '{}' } = useRouter().params
  const { type = 'noData' } = JSON.parse(decodeURIComponent(q)) as { type: DefaultPageType }

  return (
    <View className='default-page-detail'>
      {type === 'noData' && (
        <HuiDefaultPage visible type='noData' onClick={() => Taro.navigateBack()} />
      )}
      {type === 'noSearch' && (
        <HuiDefaultPage visible type='noSearch' onClick={() => Taro.navigateBack()} />
      )}
      {type === 'failed' && (
        <HuiDefaultPage visible type='failed' />
      )}
      {type === 'custom' && (
        <HuiDefaultPage
          visible
          description='这是自定义定义描述文案'
          info='描述文案'
          imageIcon={(
            <HuiImage src={MOCK_IMAGE} mode='aspectFill' style={{ width: '100%', height: '100%' }} />
          )}
          buttonText='返回上一页'
          onClick={() => Taro.navigateBack()}
        />
      )}
    </View>
  )
}

export default DefaultPageDetail
