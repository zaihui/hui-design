/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { View, Input } from '@tarojs/components'
import { CommonEventFunction, ITouchEvent } from '@tarojs/components/types/common'
import { ViewProps } from '@tarojs/components/types/View'
import { InputProps } from '@tarojs/components/types/Input'
import HuiIcon from '../Icon'

export interface HuiInputProps extends ViewProps {
  /** 字段名字 */
  label?: React.ReactNode
  /** 输入框类型 */
  type?: 'number' | 'text' | 'idcard' | 'digit'
  /** 占位提示文案 */
  placeholder?: string
  /** 右侧箭头 */
  arrow?: boolean
  // withArray?: boolean
  /** 报错信息 */
  errorMsg?: React.ReactNode
  /** 是否禁用 */
  disabled?: boolean
  /** 获取焦点 */
  focus?: boolean
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxLength?: number
  /** 默认信息 */
  value?: string
  /** 是否展示分割线 */
  divider?: boolean
  /** 是否可点击 */
  onlyClick?: boolean
  /** 设置键盘右下角按钮的文字 */
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  unit?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void
  /** onInput事件 */
  onInput?: CommonEventFunction<InputProps.inputEventDetail>
  /** 输入框失获取焦点时触发 */
  onFocus?: CommonEventFunction<InputProps.inputForceEventDetail>
  /** 输入框失去焦点时触发 */
  onBlur?: CommonEventFunction<InputProps.inputValueEventDetail>
  /** 点击完成按钮时触发 */
  onConfirm?: CommonEventFunction<InputProps.inputValueEventDetail>
  /** 键盘高度发生变化的时候触发此事件 */
  onKeyboardHeightChange?: CommonEventFunction<InputProps.onKeyboardHeightChangeEventDetail>
}

const HuiInput: React.FC<HuiInputProps> = props => {
  const {
    errorMsg,
    divider,
    onlyClick,
    value,
    type,
    placeholder,
    arrow,
    disabled,
    label,
    className = '',
    style,
    onClick,
  } = props

  const labelDom = label ? <View className='label'>{ label }</View> : null

  // 输入框和只用来展示的div
  const inputDom = onlyClick || disabled ? <View
    className={`display-area ${value ? '' : 'none-value'}`}
  >{ value || placeholder }</View> : <Input
    value={value}
    className='input'
    type={type}
    placeholder={placeholder}
    placeholderClass='input-item-placeholder'
    focus={props.focus}
    disabled={disabled}
    adjustPosition={props.adjustPosition}
    confirmType={props.confirmType || 'done'}
    maxlength={props.maxLength || 140}
    onInput={props.onInput || (() => {})}
    onBlur={props.onBlur || (() => {})}
    onFocus={props.onFocus || (() => {})}
    onConfirm={props.onConfirm || (() => {})}
    onKeyboardHeightChange={props.onKeyboardHeightChange || (() => {})}
  />

  // input右侧箭头是否展示
  const inputArrayDom = arrow ? <HuiIcon
    name='012-right'
    style={{
      marginLeft: '10px',
    }}
  /> : null

  // 分割线是否展示 & 分割线颜色
  const divideLineDom = errorMsg || divider ? (
    <View
      className={`divider-line ${errorMsg ? 'with-error' : ''}`}
    ><View className='line' /></View>
  ) : null

  // 错误信息是否展示
  const errorMsgDom = errorMsg ? <View className='error-wrapper'>
    <View className='error-msg-wrapper'>{ errorMsg }</View>
  </View> : null

  return (
    <View
      style={style}
      className={`hui-input ${className} ${disabled ? 'disabled' : ''}`}
    >
      <View
        className='input-wrapper'
        style={props.style}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick={onlyClick && !disabled && onClick ? onClick : () => {}}
      >
        {labelDom}
        <View className='input-content'>
          {inputDom}
          {
            props.unit ? (
              <View className='unit'>{props.unit}</View>
            ) : null
          }
        </View>
        {inputArrayDom}
      </View>
      {divideLineDom}
      {errorMsgDom}
    </View>
  )
}

export default HuiInput
