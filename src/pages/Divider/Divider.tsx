import React from 'react'
import { View } from '@tarojs/components'

import PageHeader from '@/demoComponents/PageHeader'
import HuiDivider from '@/components/Divider'
import HuiIcon from '@/components/Icon'

import './Divider.scss'

const Divider: React.FC = () => (
    <View className='divider-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-27/hui-design-divider-21052701.png'
        title='分割线Divider'
        desc='用于内容或模块之间的分割。水平分割线支持自定义长度，垂直分割线支持自定义高度'
      />

      <View className='content'>
        <View className='section'>
          <View className='title'>分割线类型</View>
          <View className='content'>
            <View className='item'>
              <View className='item-title'>水平1px分割线</View>
              <HuiDivider type='horizontal' />
            </View>
            <View className='item'>
              <View className='item-title'>水平8px分割线</View>
              <HuiDivider type='horizontal' height={8} />
            </View>
            <View className='item'>
              <View className='item-title'>垂直分割线</View>
              <View>
                <HuiIcon name='034-paymetcirde' size={32} />
                <HuiDivider type='vertical' height={32} />
                <HuiIcon name='002-comments' size={32} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
)

export default Divider
