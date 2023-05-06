import { Text } from '@tarojs/components'
import React from 'react'

export interface HighlightTextProps {
  color?: string
  children: React.ReactNode
}

const defaultHighLightTextColor = '#1577FC'

const HighlightText: React.FC<HighlightTextProps> = ({ color, children }) => (
    <Text style={{ color: color ?? defaultHighLightTextColor }}>
      {children}
    </Text>
)

export default HighlightText
