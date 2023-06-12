/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { View, Textarea, Text } from '@tarojs/components'
import { TextareaProps } from '@tarojs/components/types/Textarea'
import { HIconType } from '../Icon/type'
import HuiIcon from '../Icon'

const requiredMsg = '此为必填项'
export interface HuiTextAreaProps extends TextareaProps {
  /** 字段名字 */
  label?: React.ReactNode
  /** 字段名字的辅助icon */
  labelIcon?: HIconType
  required?: boolean
  /** 报错信息 */
  errorMsg?: React.ReactNode
  upperLimit?: number
  /** 最大输入长度，设置为 -1 的时候不限制最大长度，默认140 */
  maxLength?: number
  /** 必须要设置一个高度才能用 */
  height?: string | number
  style?: React.CSSProperties
  className?: string
}

const HuiTextArea: React.FC<HuiTextAreaProps> = (props) => {
  const {
    label,
    labelIcon,
    required = true,
    value,
    maxLength = 140,
    maxlength,
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
    ...rest
  } = props
  const valueLen = useMemo(() => (value && value.length) || 0, [value])
  const [errorMsg, setErrorMsg] = useState(props.errorMsg)

  const labelDom = label ? (
    <View className='label'>
      <View>{label}</View>
      {!required && <View className='label-required'>(选填)</View>}
      {labelIcon && (
        <HuiIcon
          name={labelIcon}
          size={14}
          className='label-icon'
          color='#bbb'
        />
      )}
    </View>
  ) : null

  // 错误信息是否展示
  const errorMsgDom = errorMsg ? (
    <View className='error-wrapper'>
      <View className='error-msg-wrapper'>{errorMsg}</View>
    </View>
  ) : null

  const textareaDom = (
    <Textarea
      disableDefaultPadding={disableDefaultPadding}
      showConfirmBar={showConfirmBar}
      adjustPosition={adjustPosition}
      focus={focus}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      maxlength={maxlength || maxLength}
      cursorSpacing={32}
      placeholderClass='placeholder'
      className='text-area'
      onLineChange={onLineChange}
      onInput={(e) => {
        // eslint-disable-next-line
        // @ts-ignore
        if (
          !props.errorMsg &&
          required &&
          !e.detail.value &&
          errorMsg !== requiredMsg
        ) {
          setErrorMsg(requiredMsg)
        }
        onInput(e)
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onConfirm={onConfirm}
      onKeyboardHeightChange={onKeyboardHeightChange}
      {...rest}
    />
  )

  return (
    <View
      className={cx('hui-text-area', className, { disabled })}
      style={{
        height: typeof height === 'string' ? height : `${height}px`,
        ...style,
      }}
    >
      <View className='hui-text-area-label-area'>{labelDom}</View>
      {textareaDom}
      {errorMsgDom || (
        <View className='indicator'>
          <Text
            className={`current-number ${
              upperLimit && valueLen > upperLimit
                ? 'overage'
                : valueLen
                ? ''
                : 'zero'
            }`}
          >
            {valueLen}
          </Text>
          <Text>/{upperLimit || '-'}</Text>
        </View>
      )}
    </View>
  )
}

export default HuiTextArea
