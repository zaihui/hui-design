import { Form } from '@tarojs/components'
import React, { ReactNode, useImperativeHandle } from 'react'
import classNames from 'classnames'

import Context, { FieldContext } from './constants'
import useForm from './hooks/useForm'

const defaultFunc = () => ({})

export interface HuiFormProps {
  /** 外层的class */
  className?: string
  children?: ReactNode
  /** 校验成功 */
  onFinish?: (values: object) => void
  /** 校验失败 */
  onFinishFailed?: (values: object) => void
  /** 值变化 */
  onValuesChange?: (values: object, allValues: object) => void
  /** 重置 */
  onReset?: () => void
  form: FieldContext
}

const { Provider } = Context

const HuiForm = (props: HuiFormProps, ref) => {
  const {
    onFinish = defaultFunc,
    onValuesChange = defaultFunc,
    onFinishFailed = defaultFunc,
    onReset = defaultFunc,
    children,
    form,
    className,
  } = props

  const formInstance = useForm(form)[0] as FieldContext
  const { setCallbacks, submit, reset } = formInstance

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    submit()
  }

  const handleReset = (event) => {
    event.preventDefault()
    event.stopPropagation()
    reset()
  }

  setCallbacks({
    onFinish,
    onFinishFailed,
    onValuesChange,
    onReset,
  })

  useImperativeHandle(ref, () => formInstance, [])

  return (
    <Form
      className={classNames('hui-form', className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Provider value={formInstance}>{children}</Provider>
    </Form>
  )
}

/**
 * form表单容器组件
 */
const HForm: React.FC<HuiFormProps> = React.forwardRef(HuiForm)

export default HForm
