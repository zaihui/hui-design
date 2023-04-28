import { useRouter } from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'

import EditorDisplay from '@/components/EditorDisplay'

type EditorDisplayType = 'noContent' | 'withContent';

const EditorDisplayDetail: React.FC = () => {
  const { q = '{}' } = useRouter().params
  const { type = 'noContent' } = JSON.parse(decodeURIComponent(q)) as {
    type: EditorDisplayType
  }
  const headerContent = '爆浆鸡排：色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口'
  const footerContent = '爆浆鸡排：色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口色泽金黄-酥脆可口'

  return (
    <View className='editor-display-detail'>
      {type === 'noContent' && (
        <EditorDisplay type='noContent' image='https://r.kezaihui.com/client/2022-03-10/editor_display_610.png' />
      )}
      {type === 'withContent' && (
        <EditorDisplay
          type='withContent'
          image='https://r.kezaihui.com/client/2022-03-10/editor_display_458.png'
          headerContent={headerContent}
          footerContent={footerContent}
        />
      )}
    </View>
  )
}

export default EditorDisplayDetail
