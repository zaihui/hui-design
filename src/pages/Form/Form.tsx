import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import HuiButton from '@/components/Button/Button'
import HuiForm, { useForm } from '@/components/Form/index'
import HuiInput from '@/components/Input'
import HuiPicker, { HuiPickerColumn } from '@/components/Picker'
import HuiTextArea from '@/components/TextArea'
import GroupSection from '@/demoComponents/GroupSection'
import PageHeader from '@/demoComponents/PageHeader'

import './Form.scss'

const open1Columns: HuiPickerColumn<string>[][] = [
  [{ text: '男' }, { text: '女' }],
]

const InputPage: React.FC = () => {
  const [localData, setLocalData] = useState({
    account: '',
    password: '',
    gender: '男',
    disable: '',
    description: '',
  })

  const [form] = useForm()

  const [open1, setOpen1] = useState(false)
  const handleOpen1Confirm = value => {
    const checkedVal = open1Columns[0][value[0]].text
    form.setFieldValue('gender', checkedVal)
    setOpen1(false)
  }

  useEffect(() => {
    form.setFieldsValue(localData)
  }, [])

  const handleChange = useCallback((_cur, formData) => {
    setLocalData({ ...formData })
  }, [])

  const handleFinish = useCallback(data => {
    Taro.showModal({
      title: '提示',
      content: `提交成功：'${JSON.stringify(data)}`,
    })
  }, [])

  const handleReset = useCallback(() => {
    Taro.showModal({
      title: '重置',
      content: `重置成功：'${JSON.stringify(form.getFieldsValue())}`,
    })
  }, [])

  const buttonStyle = useMemo(
    () => ({ width: '50%', margin: '30px auto' }),
    [],
  )

  const HuiFormItem = HuiForm.Item
  return (
    <View className='form-demo-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-29/hui-design-input-21053001.png'
        title='表单 Form'
        desc='具有基础的提交验证功能，并自动绑定value和onChange事件'
      />
      <View className='content'>
        <GroupSection title='基础用法'>
          <HuiForm
            onValuesChange={handleChange}
            form={form}
            onFinish={handleFinish}
            onReset={handleReset}
          >
            <HuiFormItem
              rule={[
                {
                  require: true,
                },
                value => value,
              ]}
              label='账号'
              name='account'
            >
              <HuiInput
                divider={false}
                onInput={e => form.setFieldValue('account', e.detail.value)}
              ></HuiInput>
            </HuiFormItem>
            <HuiFormItem
              label='密码'
              name='password'
              rule={[
                {
                  require: true,
                  message: '密码格式校验失败',
                },
                value => value.length >= 6 && value.length <= 10,
              ]}
              tipsText='密码必须为6-10个字符之间'
            >
              <HuiInput
                divider={false}
                onInput={e => form.setFieldValue('password', e.detail.value)}
                type='safe-password'
              ></HuiInput>
            </HuiFormItem>

            <HuiFormItem label='性别' name='gender'>
              <View onClick={() => setOpen1(true)}>
                {form.getFieldValue('gender') || '请选择'}
              </View>
              <HuiPicker
                visible={open1}
                onClose={() => setOpen1(false)}
                current={[0]}
                columns={open1Columns}
                onConfirm={handleOpen1Confirm}
                title='单列滚动选择器'
              />
            </HuiFormItem>

            <HuiFormItem
              rule={[{ require: true }]}
              align='column'
              label='简介'
              name='description'
            >
              <HuiTextArea
                upperLimit={50}
                onInput={e => form.setFieldValue('description', e.detail.value)}
              ></HuiTextArea>
            </HuiFormItem>
            <HuiButton formType='submit' block style={buttonStyle}>
              提交表单
            </HuiButton>
            <HuiButton formType='reset' block style={buttonStyle}>
              重置表单
            </HuiButton>
          </HuiForm>
        </GroupSection>
      </View>
    </View>
  )
}

export default InputPage
