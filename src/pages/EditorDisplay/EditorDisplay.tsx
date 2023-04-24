import React from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import router from '@/router'

import './EditorDisplay.scss'

const EditorDisplay: React.FC = () => (
    <View className='editor-display'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-09-17/hui-design-editor-display-21091702.png'
        title='图文展示 Editor display'
        desc='用户可以使用富文本编辑器编辑商品，并且在小程序中可以进行展示。'
      />

      <View className='content'>
        <GroupSection title='展示类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                router.EditorDisplayDetail.navigateTo({
                  type: 'noContent',
                })
              }}
            >
              图片展示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => {
                router.EditorDisplayDetail.navigateTo({
                  type: 'withContent',
                })
              }}
            >
              图文展示
            </HuiButton>
          </View>
        </GroupSection>
      </View>
    </View>
)

export default EditorDisplay
