import React from 'react'
import { View, Text } from '@tarojs/components'

import '../Timer.scss'

interface TimerItemProps {
  num: number | string
  separator: string | React.ReactElement
}

const TimerItem: React.FC<TimerItemProps> = props => {
  const { num = 0, separator = '' } = props

  return (
    <View className='hui-timer-item'>
      <View className='hui-timer-item-box'>
        <Text className='hui-timer-item-box-time'>{num}</Text>
      </View>
      <Text className='hui-timer-item-separator'>{separator}</Text>
    </View>
  )
}

export default TimerItem
