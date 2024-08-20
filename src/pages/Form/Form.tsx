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
import HuiRadio from '@/components/Radio'

import './Form.scss'

const BooleanRadioGroup: React.FC<{
  options?: [React.ReactNode, React.ReactNode]
  value?: boolean
  onChange?: (value: boolean) => void
}> = (props) => {
  const { value, onChange, options } = props
  let trueNode
  let falseNode
  if (options instanceof Array && options.length > 0) {
    ;[trueNode, falseNode] = options
  }
  return (
    <View className='boolean-radio-group'>
      <View
        className='boolean-radio-group-item'
        onClick={() => {
          if (onChange) {
            onChange(true)
          }
        }}
      >
        <HuiRadio size={16} value={1} checked={value === !!1}>
          {trueNode ?? <View>是</View>}
        </HuiRadio>
      </View>
      <View
        className='boolean-radio-group-item'
        onClick={() => {
          if (onChange) {
            onChange(false)
          }
        }}
      >
        <HuiRadio size={16} value={0} checked={value === !!0}>
          {falseNode ?? <View>否</View>}
        </HuiRadio>
      </View>
    </View>
  )
}

const open1Columns: HuiPickerColumn<string>[][] = [
  [{ text: '男' }, { text: '女' }],
]

const InputPage: React.FC = () => {
  const [localData, setLocalData] = useState({
    sync: false,
    account: '',
    password: '',
    gender: '男',
    disable: '',
    description: '',
  })

  const [localData2, setLocalData2] = useState({
    sync: false,
  })

  const [form] = useForm()

  const [form2] = useForm()

  useEffect(() => {
    form.setFieldsValue(localData)
    form2.setFieldsValue(localData2)
  }, [])

  const [open1, setOpen1] = useState(false)
  const handleOpen1Confirm = (value) => {
    const checkedVal = open1Columns[0][value[0]].text
    form.setFieldValue('gender', checkedVal)
    setOpen1(false)
  }

  useEffect(() => {
    form.setFieldsValue(localData)
  }, [])

  const handleChange1 = useCallback((_cur, formData) => {
    setLocalData({ ...formData })
  }, [])

  const handleChange2 = useCallback((_cur, formData) => {
    setLocalData2({ ...formData })
  }, [])

  const handleFinish = useCallback((data) => {
    Taro.showModal({
      title: '提示',
      content: `提交成功：'${JSON.stringify(data)}`,
    })
  }, [])

  const handleReset = useCallback((f) => {
    Taro.showModal({
      title: '重置',
      content: `重置成功：'${JSON.stringify(f.getFieldsValue())}`,
    })
  }, [])

  const buttonStyle = useMemo(() => ({ width: '50%', margin: '30px auto' }), [])

  const handleMessage = (value: string): string => {
    if (!value) {
      return '请填写您的密码'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return '密码必须包含特殊字符'
    }
    if (!/^[A-Za-z]/.test(value)) {
      return '密码首位必须是英文开头'
    }
    if (value.length < 6 || value.length > 10) {
      return '密码必须大于6位，小于10位数'
    }
    return ''
  }

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
            onValuesChange={handleChange1}
            form={form}
            onFinish={handleFinish}
            onReset={() => handleReset(form)}
          >
            <HuiFormItem
              rule={[
                {
                  require: true,
                },
                (value) => value,
              ]}
              label='账号'
              name='account'
            >
              <HuiInput
                divider={false}
                onInput={(e) => form.setFieldValue('account', e.detail.value)}
              ></HuiInput>
            </HuiFormItem>
            <HuiFormItem
              label='密码'
              name='password'
              rule={[
                {
                  require: true,
                  message: handleMessage(form.getFieldValue('password')),
                },
                (value) => !handleMessage(value),
              ]}
              tipsText='密码必须为6-10个字符之间'
            >
              <HuiInput
                divider={false}
                onInput={(e) => form.setFieldValue('password', e.detail.value)}
                type='safe-password'
              ></HuiInput>
            </HuiFormItem>

            <HuiFormItem
              rule={[{ require: true }]}
              label='是否同步信息'
              name='sync'
            >
              <BooleanRadioGroup />
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
                required={false}
                upperLimit={50}
                onInput={(e) =>
                  form.setFieldValue('description', e.detail.value)
                }
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

        <GroupSection title='动态变更表单'>
          <HuiForm
            onValuesChange={handleChange2}
            form={form2}
            onFinish={handleFinish}
            onReset={() => handleReset(form2)}
          >
            <HuiFormItem
              rule={[{ require: true }]}
              label='是否同步信息'
              name='sync'
            >
              <BooleanRadioGroup />
            </HuiFormItem>

            {localData2.sync && (
              <HuiFormItem
                rule={[{ require: true }]}
                label='信息内容'
                name='text'
              >
                <HuiInput
                  divider={false}
                  onInput={(e) => form2.setFieldValue('text', e.detail.value)}
                ></HuiInput>
              </HuiFormItem>
            )}

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
