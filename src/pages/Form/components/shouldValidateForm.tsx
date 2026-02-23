import React, { useCallback, useEffect } from 'react'
import HuiForm, { useForm } from '@/components/Form/index'
import HuiButton from '@/components/Button/Button'
import GroupSection from '@/demoComponents/GroupSection'
import Taro from '@tarojs/taro'
import HuiInput from '@/components/Input'
import HuiTextArea from '@/components/TextArea'

const HuiFormItem = HuiForm.Item

const ShouldValidate: React.FC = () => {
  const [form] = useForm()

  const handleReset = useCallback((f) => {
    Taro.showModal({
      title: '重置',
      content: `重置成功：'${JSON.stringify(f.getFieldsValue())}`,
    })
  }, [])

  const handleFinish = useCallback((data) => {
    Taro.showModal({
      title: '提示',
      content: `提交成功：'${JSON.stringify(data)}`,
    })
  }, [])

  useEffect(() => {
    form.setFieldsValue(
      {
        account: '1234567890',
        password: '',
        description: '',
      },
      { shouldValidate: false },
    )
  }, [form])

  return (
    <GroupSection title='form 校验时机'>
      <HuiForm
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
          label={(v) => `账号长度: ${v?.length ?? 0}`}
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
              message: '密码必须填写',
            },
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
          rule={[{ require: true, message: '简介必须填写' }]}
          align='column'
          label='简介'
          name='description'
        >
          <HuiTextArea
            required={false}
            upperLimit={50}
            onInput={(e) => form.setFieldValue('description', e.detail.value)}
          ></HuiTextArea>
        </HuiFormItem>

        <HuiButton formType='submit' block style={{ margin: '12px 0' }}>
          提交表单
        </HuiButton>
        <HuiButton formType='reset' type='secondary' block>
          重置表单
        </HuiButton>
      </HuiForm>
    </GroupSection>
  )
}

export default ShouldValidate
