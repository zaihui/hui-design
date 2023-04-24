/* eslint-disable no-console */
import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiInput from '@/components/Input'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Input.scss'

const InputPage: React.FC = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  return (
    <View className='input-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-29/hui-design-input-21053001.png'
        title='单行文本框Text Field'
        desc='是最基础的文本输入'
      />
      <View className='content'>
        <GroupSection title='基础用法'>
          <HuiInput label='身份证' placeholder='请输入身份证号码' />
          <HuiInput label='兑换人民币' placeholder='请输入金额' unit='元' />
          <HuiInput placeholder='无标题输入框样式' />
        </GroupSection>

        <GroupSection title='输入框'>
          <HuiInput label='禁用状态' disabled placeholder='请输入' />
          <HuiInput
            label='输入框标题'
            placeholder='提示文案的内容建议不超过24个字符'
            value={value1}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={e => setValue1(e.target.value)}
            errorMsg={value1.length >= 24 ? '输入内容长度不要超过24个字符' : ''}
          />
          <HuiInput
            label='输入名称特别长'
            placeholder='提示文章的内容建议不超过24个字符'
            value={value2}
            errorMsg={value2.length >= 24 ? '输入长度不要超过24个字符' : ''}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={e => setValue2(e.target.value)}
          />
        </GroupSection>
      </View>
    </View>
  )
}

export default InputPage
