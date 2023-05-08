// form-item

import { CSSProperties, ReactNode } from 'react'

export const TextareaHeight = 'auto'
export const formItemPrefix = 'hui-form-item'
export const ErrorCss = `${formItemPrefix}-error`
export const DisableCss = 'h-input-content-disable'
export const NormalCss = `${formItemPrefix}-normal`
export const InputRequireErrorText = '该输入框内容必填'
export const InputHeight = 24

export interface ItemType {
  input
  inputNumber
  inputDigit
  picker
  textarea
  checkbox
  other
  datePicker
}

export type DefaultRuleTarget = {
  /** 是否必须 */
  require?: boolean
  /** 正则 */
  pattern?: RegExp
  /** 文案 */
  message?: string
}

type RuleReg = (
  value: any,
  target: {
    getFieldValue: any
  },
) => (boolean)

type FullRule = [
  /** rule对象 */
  DefaultRuleTarget,
  /** 自定义rule函数 */
  RuleReg,
]
type SimpleRule = [
  /** rule对象 */
  DefaultRuleTarget,
]

export type Rule = FullRule | SimpleRule | []

export enum AlignType {
  ROW = 'row',
  COLUMN = 'column',
}

export interface HuiFormItemProps {
  children?: ReactNode
  /** 表单key */
  name: string | string[]
  /** 文本 */
  label?: string | ReactNode
  /** 补充描述 */
  // desc?: string
  /** 对单排列方式, 默认row */
  align?: 'row' | 'column'
  /** 校验规则
   * [{require，patten，message},customRuleFun]
   * @description require - 是否必须， 默认 false
   * @description regExp - 正则校验，默认 undefined
   * @description message -  文本
   * @description customFunction - 自定义校验函数 返回一个数组【boolean，string】 - true表示通过
   */
  rule?: Rule
  /** 提示文案 */
  tipsText?: string
  /** 显示 */
  visible?: boolean
  /** 自定义require style */
  customOptionalStyle?: ReactNode
  /** 隐藏选填样式 */
  hiddenOptionalStyle?: boolean
  /** 文本右侧图标 */
  labelIconNode?: ReactNode
  /** 图标点击函数 */
  onLabelIconClick?: () => void
  /** 自定义整体类名 */
  className?: string
  /** 内联 */
  style?: CSSProperties
  /** label样式 */
  labelStyle?: CSSProperties
  extra?: ReactNode
  /** align === row 时生效，展示箭头 默认值为false */
  showArrow?: boolean
}
