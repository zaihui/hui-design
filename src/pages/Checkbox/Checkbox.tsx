import React, { useState } from 'react'
import { View } from '@tarojs/components'

import Checkbox from '@/components/Checkbox'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Checkbox.scss'

const CheckboxSample: React.FC<{
  title: string
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='checkbox-sample'>
    {title && <View className='title'>{title}</View>}
    <View className='content'>{children}</View>
  </View>
)

const CheckboxPage: React.FC = () => {
  const [demo1Checked, setDemo1Checked] = useState(true)
  const [demo2Checked, setDemo2Checked] = useState(true)
  const [demo3Checked, setDemo3Checked] = useState(true)
  const [demo5Checked, setDemo5Checked] = useState(false)

  return (
    <View className='checkbox-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-29/hui-design-checkbox-21053001.png'
        title='复选框Checkbox'
        desc='在一组可选项中进行多项选择，单次点击则选中，选中时再次点击，可取消选择'
      />
      <View className='content'>
        <GroupSection title='复选框大小'>
          <CheckboxSample title=''>
            <Checkbox checked={demo1Checked} value='demo1' size={32} onClick={() => setDemo1Checked(!demo1Checked)} />
          </CheckboxSample>
          <CheckboxSample title=''>
            <Checkbox checked={demo2Checked} value='demo2' onClick={() => setDemo2Checked(!demo2Checked)} />
          </CheckboxSample>
        </GroupSection>

        <GroupSection title='复选框状态'>
          <CheckboxSample title='选中'>
            <Checkbox checked={demo3Checked} value='demo3' onClick={() => setDemo3Checked(!demo3Checked)} />
          </CheckboxSample>
          <CheckboxSample title='选中不可点击'>
            <Checkbox checked disabled value='demo4' />
          </CheckboxSample>
          <CheckboxSample title='未选中'>
            <Checkbox checked={demo5Checked} value='demo5' onClick={() => setDemo5Checked(!demo5Checked)} />
          </CheckboxSample>
          <CheckboxSample title='未选中不可点击'>
            <Checkbox checked={false} disabled value='demo6' />
          </CheckboxSample>
        </GroupSection>
      </View>
    </View>
  )
}

export default CheckboxPage
