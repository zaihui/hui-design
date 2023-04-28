import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import HuiPopup from '@/components/Popup'
import HuiButton from '@/components/Button/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Popup.scss'

const PopupPage: React.FC = () => {
  const [v1, setV1] = useState(false)
  const [v2, setV2] = useState(false)
  const [v3, setV3] = useState(false)
  const [v4, setV4] = useState(false)
  const [v5, setV5] = useState(false)
  const [v6, setV6] = useState(false)

  return (
    <View className='popup-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-popup-21053101.png'
        title='弹出层Popup'
        desc='用于规范页面元素的所属层级、层级顺序及组合规范'
      />

      <View className='content'>
        <GroupSection title='弹出层类型'>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV1(true)}
            >
              中间弹窗
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV2(true)}
            >
              顶部弹出
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV3(true)}
            >
              底部弹出
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV4(true)}
            >
              左侧弹出
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV5(true)}
            >
              右侧弹出
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              type='secondary'
              block
              onClick={() => setV6(true)}
            >
              点击空白遮罩无法关闭
            </HuiButton>
          </View>
        </GroupSection>
      </View>

      <HuiPopup
        visible={v1}
        onClose={() => setV1(false)}
        style={{ padding: '30px 50px' }}
      >
        内容
      </HuiPopup>
      <HuiPopup
        visible={v2}
        position='top'
        onClose={() => setV2(false)}
        style={{ padding: '30px 50px' }}
      >
        内容
      </HuiPopup>
      <HuiPopup
        visible={v3}
        position='bottom'
        onClose={() => setV3(false)}
        style={{ padding: '30px 50px' }}
      >
        内容
      </HuiPopup>
      <HuiPopup
        visible={v4}
        position='left'
        onClose={() => setV4(false)}
        style={{ padding: '30px 50px' }}
      >
        内容
      </HuiPopup>
      <HuiPopup
        visible={v5}
        position='right'
        onClose={() => setV5(false)}
        style={{ padding: '30px 50px' }}
      >
        内容
      </HuiPopup>

      <HuiPopup
        visible={v6}
        position='bottom'
        onClose={() => setV6(false)}
        style={{ padding: '30px 16px' }}
        maskClosable={false}
        onClick={() => Taro.showToast({ icon: 'none', title: '你点了内容区域' })}
      >
        <HuiButton block size='large' onClick={() => setV6(false)}>只能点我关闭</HuiButton>
      </HuiPopup>
    </View>
  )
}

export default PopupPage
