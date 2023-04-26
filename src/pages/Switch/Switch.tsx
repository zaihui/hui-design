import React, { useState } from 'react'
import { View } from '@tarojs/components'

import Switch from '@/components/Switch'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Switch.scss'

const SwitchSample: React.FC<{
  title: string
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='switch-sample'>
    <View className='title'>{title}</View>
    <View className='content'>{children}</View>
  </View>
)

const SwitchPage: React.FC = () => {
  const [demo1Checked, setDemo1Checked] = useState(true)
  const [demo2Checked, setDemo2Checked] = useState(true)
  const [demo3Checked, setDemo3Checked] = useState(true)
  return (
    <View className='switch-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-29/hui-design-switch-21.053001.png'
        title='开关Switch'
        desc='需要表示开关状态/两种状态之间的切换'
      />
      <View className='content'>
        <GroupSection title='开关样式'>
          <Switch checked={demo1Checked} onChange={v => setDemo1Checked(v)} />
        </GroupSection>
        <GroupSection title='开关状态'>
          <SwitchSample title='开启'>
            <Switch checked={demo2Checked} onChange={v => setDemo2Checked(v)} />
          </SwitchSample>
          <SwitchSample title='开启不可点'>
            <Switch checked disabled />
          </SwitchSample>
          <SwitchSample title='关闭'>
            <Switch checked={demo3Checked} onChange={v => setDemo3Checked(v)} />
          </SwitchSample>
          <SwitchSample title='关闭不可点击'>
            <Switch checked={false} disabled />
          </SwitchSample>
        </GroupSection>
      </View>
    </View>
  )
}

export default SwitchPage
