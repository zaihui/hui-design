import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiListItem from '@/components/List/ListItem'
import HuiModal from '@/components/Modal'

const DemoPage: React.FC = () => {
  const [v1, setV1] = useState(false)

  // #region demo
  return (
    <View className='icon-sample'>
      <View className='sample-nav'>模态窗 Modal</View>

      <View className='sample-title'>基本用法</View>
      <HuiListItem title='模态窗' onClick={() => setV1(true)}></HuiListItem>
      <HuiModal
        title='标题'
        visible={v1}
        onClose={() => setV1(false)}
        contentStyle={{ padding: '50px', textAlign: 'center' }}
      >
        内容
      </HuiModal>
    </View>
  )
}
// #endregion demo

export default DemoPage
