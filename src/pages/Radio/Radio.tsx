import React, { useState } from 'react'
import { View } from '@tarojs/components'

import Radio from '@/components/Radio'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Radio.scss'

const RadioSample: React.FC<{
  title: string
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='radio-sample'>
    {title && <View className='title'>{title}</View>}
    <View className='content'>{children}</View>
  </View>
)

const RadioPage: React.FC = () => {
  const [checked1, setChecked1] = useState(false)

  return (
    <View className='radio-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-radio-21053101.png'
        title='单选框Radio'
        desc='在一组可选项中进行多项选择，单次点击则选中'
      />
      <View className='content'>
        <GroupSection title='单选框大小'>
          <RadioSample title=''>
            <Radio size={32} value='demo1' checked />
          </RadioSample>
          <RadioSample title=''>
            <Radio value='demo2' checked />
          </RadioSample>
        </GroupSection>
        <GroupSection title='单选框状态'>
          <RadioSample title='选中'>
            <Radio value='demo3' checked />
          </RadioSample>
          <RadioSample title='选中不可点'>
            <Radio value='demo3' checked disabled />
          </RadioSample>
          <RadioSample title='未选中'>
            <Radio value='demo4' checked={checked1} onClick={() => setChecked1(true)} />
          </RadioSample>
          <RadioSample title='未选中不可点'>
            <Radio value='demo5' checked={false} disabled />
          </RadioSample>
        </GroupSection>
      </View>
    </View>
  )
}

export default RadioPage
