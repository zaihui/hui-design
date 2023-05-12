import React from 'react'
import { View, ViewProps } from '@tarojs/components'

import './ContentList.scss'

export interface HuiContentListProps extends ViewProps {
  children?: React.ReactNode
}

const HuiContentList: React.FC<HuiContentListProps> = (props) => {
  const { className = '', style = {}, children } = props

  return (
    <View className={`hui-content-list ${className}`} style={style}>
      {children}
    </View>
  )
}

export default HuiContentList
