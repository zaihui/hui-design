import React from 'react'
import { View } from '@tarojs/components'

import HuiImage from '../Image'

const LOGO_SIZE = {
  WIDTH: 110,
  HEIGHT: 30,
}

export interface HuiFooterProps {
  image?: string
  content?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}
const HuiFooter: React.FC<HuiFooterProps> = props => {
  const { image, content, style, className = '' } = props
  const isSimple = !image

  return (
    <View className={`hui-footer ${className}`} style={style}>
      {!!image && (
        <View className='hui-footer-image'>
          <HuiImage src={image} width={LOGO_SIZE.WIDTH} height={LOGO_SIZE.HEIGHT} />
        </View>
      )}
      {isSimple ? <View>-&nbsp;{content}&nbsp;-</View> : content}
    </View>
  )
}

export default HuiFooter
