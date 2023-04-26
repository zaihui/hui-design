import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import HuiFAB, { HuiFloatingActionButtonPosition } from '@/components/FloatingActionButton'

import './FloatingActionButton.scss'

const FloatingActionButton: React.FC = () => {
  const [text, setText] = useState('')
  const [color, setColor] = useState('')
  const [position, setPosition] = useState<HuiFloatingActionButtonPosition>()
  return (
    <View className='floating-action-button'>
      <PageHeader
        title='🎈悬浮按钮'
        desc='用于代表应用内最重要的操作'
      />
      <HuiFAB
        prefixIcon='h203-takingpicturesfill'
        color={color}
        position={position}
      >
        {text}
      </HuiFAB>
      <View className='content'>
        <GroupSection title='展示类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                setText('')
                setColor('')
                setPosition(undefined)
              }}
            >
              基础样式
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                setColor('')
                setText('发帖')
                setPosition(undefined)
              }}
            >
              扩展样式
            </HuiButton>
          </View>
        </GroupSection>
        <GroupSection title='自定义配置'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                setText('')
                setColor('#00C968')
                setPosition(undefined)
              }}
            >
              自定义颜色
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                setText('')
                setPosition({
                  left: 12,
                  bottom: 58,
                })
              }}
            >
              自定义位置
            </HuiButton>
          </View>
        </GroupSection>
      </View>
    </View>
  )
}

export default FloatingActionButton
