import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

export interface HuiEditorDisplayProps {
  /** 缺省页类型： 'noContent' | 'withContent' */
  type?: 'noContent' | 'withContent'
  /** 图片 */
  image: string
  /** 图片上方文字 */
  headerContent?: string
  /** 图片下方文字 */
  footerContent?: string
}

const EditorDisplay: React.FC<HuiEditorDisplayProps> = props => {
  const { type, image, headerContent, footerContent } = props

  return (
    <View className='hui-editor-display'>
      <View className='hui-editor-display-title'>商品详情</View>
      {type === 'withContent' && (
        <View className='hui-editor-display-header-content hui-editor-display-extra-content'>
          {headerContent}
        </View>
      )}
      <View
        className='hui-editor-display-image-container'
      >
        <Image
          src={image}
          style={{ width: Taro.pxTransform(343) }}
          mode='widthFix'
          className='hui-editor-display-image'
        />
      </View>
      {type === 'withContent' && (
        <View className='hui-editor-display-footer-content hui-editor-display-extra-content'>
          {footerContent}
        </View>
      )}
    </View>
  )
}

export default EditorDisplay
