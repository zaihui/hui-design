/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useMemo } from 'react'
import cx from 'classnames'
import { View, Input } from '@tarojs/components'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import cloneDeep from 'lodash/cloneDeep'
import {
  BaseEventOrig,
  CommonEventFunction,
  ITouchEvent,
} from '@tarojs/components/types/common'
import { ViewProps } from '@tarojs/components/types/View'
import { InputProps } from '@tarojs/components/types/Input'
import HuiIcon from '../Icon'
import { HIconType } from '../Icon/type'
import { MatchRuleType, HuiInputParserType } from './constants'

export interface HuiInputProps extends ViewProps {
  /** 字段名字 */
  label?: React.ReactNode
  /** 字段名字的辅助icon */
  labelIcon?: HIconType
  required?: boolean
  /** 输入框类型 */
  type?: 'number' | 'text' | 'idcard' | 'digit' | 'safe-password'
  align?: 'left' | 'right'
  /** 占位提示文案 */
  placeholder?: string
  /** 右侧箭头 */
  arrow?: boolean
  /** 清除按钮 */
  clearable?: boolean
  // withArray?: boolean
  /** 报错信息 */
  errorMsg?: React.ReactNode
  /** 是否禁用 */
  disabled?: boolean
  /** 获取焦点 */
  focus?: boolean
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean
  /** 指定光标与键盘的距离，默认为 0  */
  cursorSpacing?: number
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
  /** 是否清除换行符、零宽字符 */
  clearSymbolChars?: boolean
  /** 只存在指定类型，清除其他类型字符 */
  parserValue?: HuiInputParserType | ((displayValue: string) => string)
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void
  /** 清除事件 */
  onClear?: CommonEventFunction<InputProps.inputForceEventDetail>
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

// 匹配前后空格、换行符、零宽字符
const symbolOrSpaceRegExp =
  /(^\s+|\s+$|[\r\n\u2028\u2029\u200B-\u200F\uFEFF\u2060])/g

const HuiInput: React.FC<HuiInputProps> = (props) => {
  const {
    errorMsg,
    divider = true,
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
    onInput = () => {},
    align = 'left',
    required = true,
    labelIcon,
    clearable,
    cursorSpacing = 0,
    clearSymbolChars = true,
    parserValue,
  } = props

  // 是否存在换行符、零宽字符，前后空格等
  const hasStringSpaceOrSymbols = (str: string | number) => {
    const strValue = isNumber(str) ? String(str) : str
    return symbolOrSpaceRegExp.test(strValue)
  }

  /** 清楚 input 中的换行符、零宽字符 */
  const onClearSymbol = useCallback(
    (inputValue: string | number | undefined) => {
      // 空值直接返回，不做处理
      if (isNil(inputValue)) return inputValue

      let resultValue: string | null = null

      // 数字类型的value需要转化为字符串
      if (isNumber(inputValue)) {
        resultValue = (inputValue as number)?.toString()
      } else {
        resultValue = inputValue
      }

      const mergeValueWithoutSymbols = resultValue?.replace(
        symbolOrSpaceRegExp,
        '',
      )

      return mergeValueWithoutSymbols
    },
    [],
  )

  /** 统一处理 输出格式 */
  const mergedParser = useCallback(
    (num: string | number) => {
      const numStr = String(num)

      if (typeof parserValue === 'function') {
        return parserValue(numStr)
      }

      if (parserValue && Object.keys(MatchRuleType).includes(parserValue)) {
        return numStr.replace(MatchRuleType?.[parserValue], '')
      }

      return numStr
    },
    [parserValue],
  )

  const onChange = (e) => {
    const newEvent = cloneDeep(e)
    if (parserValue) {
      const formatValue = mergedParser(newEvent.detail.value)
      newEvent.detail.value = formatValue
      newEvent.target.value = formatValue
    }
    onInput?.(newEvent)
  }

  useEffect(() => {
    if (clearSymbolChars && value && hasStringSpaceOrSymbols(value)) {
      const clearDoneValue = onClearSymbol(value)
      onChange?.({
        detail: { value: clearDoneValue },
        // 防止外部有使用，e.target.value
        target: { value: clearDoneValue },
      } as unknown as BaseEventOrig<InputProps.inputEventDetail>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onClearSymbol, clearSymbolChars])

  const mergedOnInput = (e) => {
    // 不需要处理的情况
    if (!clearSymbolChars) {
      onChange?.(e)
      return
    }

    // 判断是否符合处理条件, 减少 js 逻辑
    if (hasStringSpaceOrSymbols(e.detail.value)) {
      const resultValue = onClearSymbol(e.detail.value)
      const clearDoneEventObjeact = Object.assign(
        // 继承原型，防止外部有使用，e.target.value
        Object.create(Object.getPrototypeOf(e)),
        e,
        {
          detail: {
            value: resultValue,
          },
        },
      )
      onChange?.(clearDoneEventObjeact)
    } else {
      onChange?.(e)
    }
  }

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

  // 输入框和只用来展示的div
  const inputDom =
    onlyClick || disabled ? (
      <View
        className={cx(
          'display-area',
          { 'none-value': !value },
          { 'right-align': label && align === 'right' },
        )}
      >
        {value || placeholder}
      </View>
    ) : (
      <Input
        value={value}
        className={cx('input', { 'right-align': label && align === 'right' })}
        type={type}
        placeholder={placeholder}
        placeholderClass='input-item-placeholder'
        focus={props.focus}
        disabled={disabled}
        adjustPosition={props.adjustPosition}
        cursorSpacing={cursorSpacing}
        confirmType={props.confirmType || 'done'}
        maxlength={props.maxLength || 140}
        onInput={mergedOnInput}
        onBlur={props.onBlur || (() => {})}
        onFocus={props.onFocus || (() => {})}
        onConfirm={props.onConfirm || (() => {})}
        onKeyboardHeightChange={props.onKeyboardHeightChange || (() => {})}
      />
    )

  // input右侧箭头是否展示
  const inputArrayDom = arrow ? (
    <HuiIcon
      name='012-right'
      style={{
        marginLeft: '10px',
      }}
    />
  ) : null

  const showClear = useMemo(() => clearable && !!value, [clearable, value])

  // input右侧清除按钮是否展示
  const inputClearDom = showClear ? (
    <View
      style={{ marginLeft: '10px' }}
      onClick={(e) => {
        e.preventDefault()
        mergedOnInput({ detail: { value: '' } })
        props.onClear?.(e)
      }}
    >
      <HuiIcon
        name='005-close2'
        style={{
          color: '#c5c5c5',
        }}
      />
    </View>
  ) : null

  // 分割线是否展示 & 分割线颜色
  const divideLineDom =
    errorMsg || divider ? (
      <View className='divider-line'>
        <View className='line' />
      </View>
    ) : null

  // 错误信息是否展示
  const errorMsgDom = errorMsg ? (
    <View className='error-wrapper'>
      <View className='error-msg-wrapper'>{errorMsg}</View>
    </View>
  ) : null

  return (
    <View
      style={style}
      // 这里加个 hui-text-field 临时兼容老版本代码，后续会干掉
      className={`hui-input hui-text-field ${className} ${
        disabled ? 'disabled' : ''
      }`}
    >
      <View
        className='input-container'
        style={props.style}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick={onlyClick && !disabled && onClick ? onClick : () => {}}
      >
        <View className='input-wrapper'>
          {labelDom}
          <View className='input-content'>
            {inputDom}
            {inputClearDom}
            {props.unit ? <View className='unit'>{props.unit}</View> : null}
          </View>
          {inputArrayDom}
        </View>
        {errorMsgDom}
      </View>
      {divideLineDom}
    </View>
  )
}

export default HuiInput
