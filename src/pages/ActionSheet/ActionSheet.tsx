import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import HuiActionSheet from '@/components/ActionSheet'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './ActionSheet.scss'

const ActionSheet: React.FC = () => {
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const handleClick = o => {
    Taro.showToast({
      title: `您点击了操作${o}`,
      icon: 'none',
    })
  }

  return (
    <View className='action-sheet-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-27/hui-design-actionsheet-21052701.png'
        title='动作表Actionsheet'
        desc='用于标记元素的属性和维度或分类，可自定义圆角大小、颜色'
      />
      <View className='content'>
        <GroupSection title='动作表类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setOpen3(true)}
            >
              无标题的Actionsheet
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setOpen4(true)}
            >
              有标题的Actionsheet
            </HuiButton>
          </View>
        </GroupSection>
      </View>

      <HuiActionSheet
        visible={open3}
        onClose={() => setOpen3(false)}
      >
        <HuiActionSheet.Item hasActive={false} onClick={() => handleClick(1)}>
          操作一(点击没有active样式效果)
        </HuiActionSheet.Item>
        <HuiActionSheet.Item onClick={() => handleClick(2)}>
          操作二
        </HuiActionSheet.Item>
        <HuiActionSheet.Item onClick={() => handleClick(3)}>
          操作三
        </HuiActionSheet.Item>
      </HuiActionSheet>

      <HuiActionSheet
        title='这是一个title'
        visible={open4}
        onClose={() => setOpen4(false)}
      >
        <HuiActionSheet.Item disabled onClick={() => handleClick(1)}>
          操作一
        </HuiActionSheet.Item>
        <HuiActionSheet.Item onClick={() => handleClick(2)}>
          操作二
        </HuiActionSheet.Item>
        <HuiActionSheet.Item disabled onClick={() => handleClick(3)}>
          操作三
        </HuiActionSheet.Item>
        <HuiActionSheet.Item onClick={() => handleClick(4)}>
          操作四
        </HuiActionSheet.Item>
        <HuiActionSheet.Item onClick={() => handleClick(5)}>
          操作五
        </HuiActionSheet.Item>
      </HuiActionSheet>
    </View>
  )
}

export default ActionSheet
