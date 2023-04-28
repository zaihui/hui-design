import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import HuiButton from '@/components/Button'
import HuiPicker, { HuiPickerColumn } from '@/components/Picker'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Picker.scss'

const open1Columns: HuiPickerColumn<string>[][] = [[]]
Array(10).fill(0).forEach((_, i) => {
  open1Columns[0].push({ text: `选项${i}` })
})

const open2Columns: HuiPickerColumn<string>[][] = [[], []]
Array(24).fill(0).forEach((_, i) => {
  if (i < 24) {
    open2Columns[0].push({ text: `${i}时`.padStart(3, '0') })
  }
})
Array(60).fill(0).forEach((_, i) => {
  if (i < 60) {
    open2Columns[1].push({ text: `${i}分`.padStart(3, '0') })
  }
})

const open3Columns: HuiPickerColumn<string>[][] = [[], [], []]
const date = new Date()
for (let i = 1990; i <= date.getFullYear(); i++) {
  open3Columns[0].push({ text: `${i}年` })
}
for (let i = 1; i <= 12; i++) {
  open3Columns[1].push({ text: `${i}月` })
}
for (let i = 1; i <= 31; i++) {
  open3Columns[2].push({ text: `${i}日` })
}

const Page: React.FC = () => {
  const [open1, setOpen1] = useState(false)
  const handleOpen1Confirm = value => {
    const checkedVal = open1Columns[0][value[0]].text
    Taro.showToast({
      title: `你选择了${checkedVal}`,
      icon: 'none',
    })
    setOpen1(false)
  }

  const [open2, setOpen2] = useState(false)
  const handleOpen2Confirm = value => {
    const hourText = open2Columns[0][value[0]].text
    const minuteText = open2Columns[1][value[1]].text
    Taro.showToast({
      title: `${hourText}:${minuteText}`,
      icon: 'none',
    })
    setOpen2(false)
  }

  const [open3, setOpen3] = useState(false)
  const handleOpen3Confirm = value => {
    const yearText = open3Columns[0][value[0]].text
    const monthText = open3Columns[1][value[1]].text
    const dayText = open3Columns[2][value[2]].text
    Taro.showToast({
      title: `${yearText}-${monthText}-${dayText}`,
      icon: 'none',
    })
    setOpen3(false)
  }
  return (
    <View className='picker-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-27/hui-design-picker-21052701.png'
        title='滚动选择器'
        desc='选择组件'
      />
      <View className='content'>
        <GroupSection title='选择器类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setOpen1(true)}
            >
              单列滚动选择样式
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setOpen2(true)}
            >
              双列滚动选择样式
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setOpen3(true)}
            >
              三列滚动选择样式
            </HuiButton>
          </View>
        </GroupSection>
      </View>

      <HuiPicker
        visible={open1}
        onClose={() => setOpen1(false)}
        current={[6]}
        columns={open1Columns}
        onConfirm={handleOpen1Confirm}
        title='单列滚动选择器'
      />
      <HuiPicker
        visible={open2}
        onClose={() => setOpen2(false)}
        columns={open2Columns}
        current={[4, 4]}
        onConfirm={handleOpen2Confirm}
        onChange={(_, i) => Taro.showToast({ title: `你滚动了第${i + 1}列`, icon: 'none' })}
        title='双列滚动选择器'
      />
      <HuiPicker
        visible={open3}
        onClose={() => setOpen3(false)}
        confirmStyle={{ color: 'blue' }}
        columns={open3Columns}
        current={[4, 4, 6]}
        onConfirm={handleOpen3Confirm}
        onChange={(_, i) => Taro.showToast({ title: `你滚动了第${i + 1}列`, icon: 'none' })}
        title='三列滚动选择器'
      />
    </View>
  )
}

export default Page
