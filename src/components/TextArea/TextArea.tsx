/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo } from 'react'
import { View, Textarea, Text } from '@tarojs/components'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { TextareaProps } from '@tarojs/components/types/Textarea'

export interface HuiTextAreaProps {
  upperLimit?: number
  /** 占位提示文案 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 获取焦点 */
  focus?: boolean
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean
  /** 最大输入长度，设置为 -1 的时候不限制最大长度，默认140 */
  maxLength?: number
  /** 默认信息 */
  value?: string
  /** 是否显示键盘上方带有”完成“按钮那一栏 */
  showConfirmBar?: boolean
  /** 是否去掉 iOS 下的默认内边距 */
  disableDefaultPadding?: boolean
  /** 必须要设置一个高度才能用 */
  height?: string | number
  style?: React.CSSProperties
  className?: string
  /** 输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0} */
  onLineChange?: CommonEventFunction<TextareaProps.onLineChangeEventDetail>
  /** onInput事件 */
  onInput?: CommonEventFunction<TextareaProps.onInputEventDetail>
  /** 输入框失获取焦点时触发 */
  onFocus?: CommonEventFunction<TextareaProps.onFocusEventDetail>
  /** 输入框失去焦点时触发 */
  onBlur?: CommonEventFunction<TextareaProps.onBlurEventDetail>
  /** 点击完成按钮时触发 */
  onConfirm?: CommonEventFunction<TextareaProps.onConfirmEventDetail>
  /** 键盘高度发生变化的时候触发此事件 */
  onKeyboardHeightChange?: CommonEventFunction<TextareaProps.onKeyboardHeightChangeEventDetail>
}

const HuiTextArea: React.FC<HuiTextAreaProps> = props => {
  const {
    value,
    maxLength = 140,
    placeholder,
    disabled,
    focus,
    adjustPosition,
    showConfirmBar,
    disableDefaultPadding,
    onLineChange = () => {},
    onInput = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onConfirm = () => {},
    onKeyboardHeightChange = () => {},
    upperLimit,
    height,
    style,
    className = '',
  } = props
  const valueLen = useMemo(() => (value && value.length || 0), [value])

  const textareaDom = (
    <Textarea
      disableDefaultPadding={disableDefaultPadding}
      showConfirmBar={showConfirmBar}
      adjustPosition={adjustPosition}
      focus={focus}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      maxlength={maxLength}
      cursorSpacing={32}
      placeholderClass='placeholder'
      className='text-area'
      onLineChange={onLineChange}
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
      onConfirm={onConfirm}
      onKeyboardHeightChange={onKeyboardHeightChange}
    />
  )

  return (
    <View
      className={`hui-text-area ${className} ${disabled ? 'disabled' : ''}`}
      style={{ height: typeof height === 'string' ? height : `${height}px`, ...style }}
    >
      {textareaDom}
      <View className='indicator'>
        <Text
          className={`current-number ${upperLimit && valueLen > upperLimit ? 'overage' : (valueLen ? '' : 'zero')}`}
        >{ valueLen }</Text>
        <Text>/{ upperLimit || '-' }</Text>
      </View>
    </View>
  )
}

export default HuiTextArea
