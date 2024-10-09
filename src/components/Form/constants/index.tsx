import React, { Dispatch, SetStateAction } from 'react'

import { ItemType } from './formItem'

export * from './formItem'

export interface registerWatchType {
  name: string
  setSubmitTotal: Dispatch<SetStateAction<number>>
  onStoreChange: () => void
}

export type NamePath = string | string[]

export type FieldWatchCallback = (values: any) => void

export interface FieldContext {
  /** 删除单个表单数据 */
  removeFieldValue: (name: string | string[]) => void
  /** 获取单个表单数据 */
  getFieldValue: (name: string | string[]) => any
  /** 获取所有表单数据 */
  getFieldsValue: () => any
  /** 设置所有表单数据 */
  setFieldsValue: (sotre: any) => any
  /** 设置单个表单数据 */
  setFieldValue: (name: string | string[], value: any) => void
  /** 验证表单 */
  validatorFields: () => any
  /** 注册监听 */
  registerWatch: (id: string, filed: registerWatchType) => any
  /** 字段注册监听 */
  registerFieldWatch: (path: string, callback: FieldWatchCallback) => any
  /** 设置回调函数 */
  setCallbacks: (callbacks: any) => any
  /** 提交表单 */
  submit: () => Promise<{ type: 'success' | 'fail'; data: any }>
  /** 重制表单 */
  reset: () => Promise<void>
}

const warningFunc = () => {}

const Context = React.createContext<FieldContext>({
  removeFieldValue: warningFunc,
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  setFieldsValue: warningFunc,
  setFieldValue: warningFunc,
  validatorFields: warningFunc,
  registerWatch: warningFunc,
  registerFieldWatch: warningFunc,
  setCallbacks: warningFunc,
  submit: () => Promise.resolve().then(warningFunc as any),
  reset: () => Promise.resolve().then(warningFunc),
})

export interface FormItemContextProps {
  setRenderType: React.Dispatch<React.SetStateAction<keyof ItemType>>
}
export const FormItemContext = React.createContext<FormItemContextProps | null>(
  null,
)

export interface FormListContextProps {
  name: string | null
}
export const FormListContext = React.createContext<FormListContextProps>({
  name: null,
})

export default Context
