import { View } from '@tarojs/components'
import React, { useState } from 'react'

import Steppers from '@/components/Steppers'
import PageHeader from '@/demoComponents/PageHeader'
import HuiButton from '@/components/Button/Button'

import './Steppers.scss'

const SteppersPage: React.FC = () => {
  const [current, setCurrent] = useState(1)
  return (
    <View className='page-steppers'>
      <PageHeader
        title='步骤条 Steppers'
        desc='进度条是用户通过一组步骤的进度的可视化表示，指导用户完成指定的过程'
      />

      <View className='page-steppers-tip'>简单用法</View>
      <Steppers
        items={[
          {
            title: '步骤名称一',
          },
          {
            title: '步骤名称二',
            description: '点我试试',
          },
          {
            title: '步骤名称三',
          },
        ]}
      />
      <View className='page-steppers-tip'>禁用点击，只能通过按钮切换</View>
      <Steppers
        current={current}
        disabled
        items={[
          {
            title: '步骤一',
          },
          {
            title: '步骤二',
          },
          {
            title: '步骤三',
          },
        ]}
      />
      <View className='page-steppers-button'>
        <HuiButton onClick={() => setCurrent(1)}>第一步</HuiButton>
        <HuiButton onClick={() => setCurrent(2)}>第二步</HuiButton>
        <HuiButton onClick={() => setCurrent(3)}>第三步</HuiButton>
      </View>
      <View className='page-steppers-tip'>可增加描述性文字</View>
      <Steppers
        items={[
          {
            title: '步骤名称一',
            description: '这是描述文字-',
          },
          {
            title: '步骤名称二',
          },
          {
            title: '步骤名称三',
          },
        ]}
      />
      <View className='page-steppers-tip'>超出四个选项可滚动</View>
      <Steppers
        items={[
          {
            title: '步骤名称一',
            description: '这是描述文字-',
          },
          {
            title: '步骤名称二',
          },
          {
            title: '步骤名称三',
          },
          {
            title: '4',
          },
          {
            title: '5',
          },
        ]}
      />
      <View className='page-steppers-tip'>
        Title长度超出五位自动截断，可忽略该规则，也可单独指定某项全部展示
      </View>
      <Steppers
        items={[
          {
            title: '我超出五个字啦，你能看到我吗',
          },
          {
            showSlicedTitle: true,
            title: '我超出五个字啦，你能看到我吗？',
          },
          {
            title: '一能二不能',
          },
        ]}
      />
    </View>
  )
}

export default SteppersPage
