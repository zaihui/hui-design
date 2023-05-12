import React from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'

import './style.scss'

interface GroupSectionProps {
  className?: string
  title: string
  titleStyle?: React.CSSProperties
  children?: React.ReactNode
}
const GroupSection: React.FC<GroupSectionProps> = props => {
  const { title, children, titleStyle = {}, className } = props

  return (
    <View className={cx('group-section', className)}>
      <View className='title' style={titleStyle}>{title}</View>
      <View className='content'>
        {children}
      </View>
    </View>
  )
}

export default GroupSection
