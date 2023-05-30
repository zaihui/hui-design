import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiTextArea from '@/components/TextArea'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './TextArea.scss'

const TextArea: React.FC = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

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
            label='身份证'
            errorMsg={errorMsg}
            upperLimit={50}
            placeholder='请输入内容，最多50字'
            value={value1}
            onInput={(e) => {
              // eslint-disable-next-line
              // @ts-ignore
              if (!e.target.value) {
                setErrorMsg('此为必填项')
              }
              // eslint-disable-next-line
              // @ts-ignore
              setValue1(e.target.value)
            }}
          />
          <HuiTextArea
            label='备注'
            required={false}
            errorMsg={errorMsg}
            upperLimit={50}
            placeholder='请输入内容，最多50字'
            value={value2}
            onInput={(e) => {
              // eslint-disable-next-line
              // @ts-ignore
              if (!e.target.value) {
                setErrorMsg('此为必填项')
              }
              // eslint-disable-next-line
              // @ts-ignore
              setValue2(e.target.value)
            }}
          />
        </GroupSection>
        <GroupSection title='不带标签'>
          <HuiTextArea
            errorMsg={errorMsg}
            upperLimit={50}
            placeholder='不带标签'
            value={value3}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={(e) => setValue3(e.target.value)}
          />
        </GroupSection>
        <GroupSection title='带标签和图标'>
          <HuiTextArea
            label='带标签的文本域'
            labelIcon='112-doubtfill'
            errorMsg={errorMsg}
            upperLimit={50}
            placeholder='请输入'
            value={value3}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={(e) => setValue3(e.target.value)}
          />
        </GroupSection>
        <GroupSection title='输入状态'>
          <View className='input-status-group-section'>
            <HuiTextArea disabled upperLimit={50} placeholder='不可输入状态提示文案' />
          </View>
          <View className='input-status-group-section'>
            <HuiTextArea
              label='带标签的被禁用'
              required={false}
              labelIcon='112-doubtfill'
              disabled
              upperLimit={50}
              placeholder='请输入'
            />
          </View>
          <HuiTextArea
            placeholder='默认提示文案'
            value={value4}
            upperLimit={50}
            // eslint-disable-next-line
            // @ts-ignore
            onInput={(e) => setValue4(e.target.value)}
          />
        </GroupSection>
      </View>
    </View>
  )
}

export default TextArea
