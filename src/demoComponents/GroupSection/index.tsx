import React from 'react'
import { View } from '@tarojs/components'

import './style.scss'

interface GroupSectionProps {
  title: string
  titleStyle?: React.CSSProperties
  children?: React.ReactNode
}
const GroupSection: React.FC<GroupSectionProps> = props => {
  const { title, children, titleStyle = {} } = props

  return (
    <View className='group-section'>
      <View className='title' style={titleStyle}>{title}</View>
      <View className='content'>
        {children}
      </View>
    </View>
  )
}

export default GroupSection
