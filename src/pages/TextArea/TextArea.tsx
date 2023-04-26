import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiTextArea from '@/components/TextArea'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './TextArea.scss'

const TextArea: React.FC = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  return (
    <View className='textarea-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-29/hui-design-textarea-21053001.png'
        title='多行文本框Text Area'
        desc='是最基础的文本输入，支持多行文本输入'
      />
      <View className='content'>
        <GroupSection title='基础用法'>
          <HuiTextArea
            upperLimit={50}
            placeholder='请输入内容，最多50字'
            value={value1}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={e => setValue1(e.target.value)}
          />
        </GroupSection>
        <GroupSection title='输入状态'>
          <HuiTextArea
            disabled
            upperLimit={50}
            placeholder='不可输入状态提示文案'
          />
          <HuiTextArea
            placeholder='默认提示文案'
            value={value2}
            upperLimit={50}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={e => setValue2(e.target.value)}
          />
        </GroupSection>
      </View>
    </View>
  )
}

export default TextArea
