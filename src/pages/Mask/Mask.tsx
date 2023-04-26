import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiMask from '@/components/Mask'
import HuiButton from '@/components/Button/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Mask.scss'

const MaskPage: React.FC = () => {
  const [V1, setV1] = useState(false)
  const [V2, setV2] = useState(false)
  const [V3, setV3] = useState(false)

  return (
    <View className='mask-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2022-04-08/hui-design-mask.png'
        title='遮罩Mask'
        desc='应用于弹窗等交互模式上，点击遮罩层的背景'
      />
      <View className='content'>
        <GroupSection title='基础用法'>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV1(true)}
            >
              显示遮罩
            </HuiButton>
          </View>
        </GroupSection>
        <GroupSection title='自定义样式'>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV2(true)}
            >
              显示自定义样式遮罩
            </HuiButton>
          </View>
        </GroupSection>
        <GroupSection title='自定义内容'>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV3(true)}
            >
              显示自定义内容遮罩
            </HuiButton>
          </View>
        </GroupSection>
      </View>

      <HuiMask visible={V1} onClose={() => setV1(false)} />

      <HuiMask visible={V2} onClose={() => setV2(false)} zIndex={999} duration={0.3} style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />

      <HuiMask visible={V3} onClose={() => setV3(false)}>
        <View className='custom-content'>
          自定义内容
        </View>
      </HuiMask>
    </View>
  )
}

export default MaskPage
