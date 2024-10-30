/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import cx from 'classnames'
import { View, Text } from '@tarojs/components'
import { TextareaProps } from '@tarojs/components/types/Textarea'
import useDebounce from '../../hook/useDebounce'

import { HIconType } from '../Icon/type'
import HuiIcon from '../Icon'

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
  /** 键盘对齐位置 */
  adjustKeyboardTo?: 'cursor' | 'bottom'
  /** 输入时是否开启 */
  dirtyInput?: boolean
}

interface HuiTextAreaNumberRef {
  updateLen: React.Dispatch<React.SetStateAction<number>>
  setIsInput: React.Dispatch<React.SetStateAction<boolean>>
}

const HuiTextAreaNumber = forwardRef<
  HuiTextAreaNumberRef,
  {
    upperLimit?: number
    required?: boolean
    errorMsg?: React.ReactNode
    hiddenLimit?: boolean
  }
>(({ upperLimit, required, errorMsg, hiddenLimit = false }, ref) => {
  const [len, setLen] = useState(0)
  const [isInput, setIsInput] = useState(false)
  useImperativeHandle(
    ref,
    () => ({
      updateLen: setLen,
      setIsInput,
    }),
    [],
  )
  return required && !len && isInput ? (
    <View className='error-wrapper'>
      <View className='error-msg-wrapper'>{errorMsg}</View>
    </View>
  ) : upperLimit && !hiddenLimit ? (
    <View className='indicator'>
      <Text
        className={`current-number ${
          upperLimit && len > upperLimit ? 'overage' : len ? '' : 'zero'
        }`}
      >
        {len <= upperLimit ? len : upperLimit}
      </Text>
      <Text>/{upperLimit || '-'}</Text>
    </View>
  ) : null
})

const HuiTextArea: React.FC<HuiTextAreaProps> = (props) => {
  const {
    errorMsg = '此为必填项',
    label,
    labelIcon,
    required = true,
    value = '',
    dirtyInput = false,
    maxLength = 140,
    maxlength,
    placeholder = '请输入内容',
    disabled,
    adjustPosition,
    showConfirmBar,
    autoFocus,
    confirmType = 'return',
    disableDefaultPadding,
    adjustKeyboardTo = 'cursor',
    onLineChange,
    onInput,
    onFocus,
    onBlur,
    onConfirm,
    onKeyboardHeightChange,
    height,
    style,
    cursor = 0,
    holdKeyboard,
    className = '',
  } = props
  const localValue = useRef(value)
  const huiTextAreaNumberRef = useRef<HuiTextAreaNumberRef>()
  const maxLen = maxlength || maxLength

  useEffect(() => {
    localValue.current = value
    huiTextAreaNumberRef?.current?.updateLen?.(localValue.current?.length ?? 0)
  }, [value])

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

  const handleInput = useDebounce((e) => {
    onInput?.(e)
  }, 600)

  const textareaDom = (
    // eslint-disable-next-line
    // @ts-ignore
    <hui-textarea
      adjustKeyboardTo={adjustKeyboardTo}
      confirmType={confirmType}
      disableDefaultPadding={disableDefaultPadding}
      showConfirmBar={showConfirmBar}
      adjustPosition={adjustPosition}
      focus
      placeholder={placeholder}
      holdKeyboard={holdKeyboard}
      cursor={cursor}
      autoFocus={autoFocus}
      maxlength={maxLen}
      disabled={disabled}
      cursorSpacing={32}
      placeholderClass='placeholder'
      onLinechange={onLineChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onConfirm={onConfirm}
      onKeyboardheightchange={onKeyboardHeightChange}
      value={value}
      onInput={(e) => {
        huiTextAreaNumberRef?.current?.setIsInput(true)

        localValue.current = e.detail.value

        huiTextAreaNumberRef?.current?.updateLen?.(
          localValue.current?.length ?? 0,
        )

        if (!dirtyInput) {
          handleInput(e)
        } else {
          onInput?.(e)
        }
      }}
    />
  )

  return (
    <View
      className={cx('hui-text-area', className, { disabled })}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    >
      <View className='hui-text-area-label-area'>{labelDom}</View>
      {textareaDom}
      <HuiTextAreaNumber
        required={required}
        ref={huiTextAreaNumberRef as RefObject<HuiTextAreaNumberRef>}
        upperLimit={maxLen}
        errorMsg={errorMsg}
      />
    </View>
  )
}

export default HuiTextArea
