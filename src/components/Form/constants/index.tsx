import React, { Dispatch, SetStateAction } from 'react'

import { ItemType } from './formItem'

export * from './formItem'

export interface registerWatchType {
  name: string
  setSubmitTotal: Dispatch<SetStateAction<number>>
  onStoreChange: () => void
}

export interface FieldContext {
  getFieldValue: (name: string | string[]) => any
  getFieldsValue: () => any
  setFieldsValue: (sotre: any) => any
  setFieldValue: (name: string | string[], value: any) => any
  validatorFields: () => any
  registerWatch: (filed: registerWatchType) => any
  setCallbacks: (callbacks: any) => any
  submit: () => Promise<void>
  reset: () => Promise<void>
}

const warningFunc = () => {}

const Context = React.createContext<FieldContext>({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  setFieldsValue: warningFunc,
  setFieldValue: warningFunc,
  validatorFields: warningFunc,
  registerWatch: warningFunc,
  setCallbacks: warningFunc,
  submit: () => Promise.resolve().then(warningFunc),
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
