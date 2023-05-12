import React from 'react'
import { View } from '@tarojs/components'

import './style.scss'

interface SubGroupSectionProps {
  title: string
  style?: React.CSSProperties
  children?: React.ReactNode
}
const SubGroupSection: React.FC<SubGroupSectionProps> = props => {
  const { title, style, children } = props

  return (
    <View className='sub-group-section' style={style}>
      <View className='sgs-title'>{title}</View>
      <View className='sgs-content'>{children}</View>
    </View>
  )
}

export default SubGroupSection
