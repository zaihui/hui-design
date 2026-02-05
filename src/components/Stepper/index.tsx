/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react'
import { ViewProps } from '@tarojs/components/types/View'
import { View } from '@tarojs/components'
import isNil from 'lodash/isNil'
import {
  CommonEvent,
  CommonEventFunction,
  ITouchEvent,
} from '@tarojs/components/types/common'
import { pxTransform } from '../../utils'
import Icon from '../Icon/Icon'
import HuiInput, { HuiInputProps } from '../Input'

export interface InputError {
  type: 'OVER' | 'LOW' | 'DISABLED'
  errorValue: number
}

type ExtendEvent = {
  target: {
    value: string | number
  }
}

export interface HuiStepperBaseProps extends ViewProps {
  /**
   * 输入框类型
   * @type {'number' | 'digit'}
   * @description 必填，type='digit' 时，h5 无法显示数字输入框，若需要数字输入框建议使用 number (v1.5.1 支持)
   */
  type: 'number' | 'digit'
  /**
   * 输入框当前值
   * @type {number | string}
   * @description 必填，输入框当前值，开发者需要通过 onChange 事件来更新 value 值
   */
  value?: number | string

  /**
   * 最小值
   * @type {number}
   * @default 0
   */
  min?: number
  /**
   * 最大值
   * @type {number}
   * @default 100
   */
  max?: number
  /**
   * 每次点击改变的间隔大小
   * @type {number}
   * @default 1
   */
  step?: number
  /**
   * input 宽度
   * @type {number}
   * @description 不包括两侧按钮，单位根据环境转为 rpx 或 rem
   * @default 24
   */
  width?: number
  /**
   * 是否禁止输入，禁止点击按钮
   * @type {boolean}
   * @default false
   */
  disabled?: boolean
  /**
   * 是否禁止输入，但不禁止点击按钮
   * @type {boolean}
   * @default false
   */
  disabledInput?: boolean
  /**
   * 是否允许清空输入框
   * @default false
   */
  allowEmpty?: boolean
  /**
   * 输入框值改变时触发的事件
   * @param {number | null} value 输入框当前值，allowEmpty 为 true 时可能为 null
   * @description 开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填
   */
  // onChange?: (value: number | null, e: CommonEvent) => void
  /**
   * 输入框值失去焦点时触发的事件
   */
  onBlur?: CommonEventFunction
  /**
   * 输入框尝试输入错误数组触发的事件
   * @param {InputError} errCb
   */
  onErrorInput?: (errCb: InputError) => void
  /**
   * 初始化时是否隐藏minus按钮，只有value等于0的时候有效
   */
  hideMinus?: boolean
  /**
   * 透传给 Input 组件的属性
   * @description 可以传入 HuiInput 组件支持的其他属性，如 placeholder、cursorSpacing、maxLength 等
   */
  inputProps?: Omit<
    HuiInputProps,
    | 'type'
    | 'value'
    | 'disabled'
    | 'onInput'
    | 'onBlur'
    | 'divider'
    | 'inputStyle'
  >
  style?: React.CSSProperties
  className?: string
}

export type HuiStepperProps =
  | (HuiStepperBaseProps & {
      allowEmpty?: false
      /**
       * 输入框值改变时触发的事件
       * @param {number | null} value 输入框当前值，allowEmpty
       * @description 开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填
       */
      onChange?: (value: number, e: CommonEvent) => void
    })
  | (HuiStepperBaseProps & {
      allowEmpty: true
      /**
       * 输入框值改变时触发的事件
       * @param {number | null} value 输入框当前值，allowEmpty 为 true 时可能为 null
       * @description 开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填
       */
      onChange?: (value: number | null, e: CommonEvent) => void
    })

function addNum(num1: number, num2: number): number {
  let sq1: number, sq2: number
  try {
    sq1 = num1.toString().split('.')[1].length
  } catch (e) {
    sq1 = 0
  }
  try {
    sq2 = num2.toString().split('.')[1].length
  } catch (e) {
    sq2 = 0
  }
  const m = Math.pow(10, Math.max(sq1, sq2))
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num: string): string {
  if (num === '') return '0'

  const numStr = num.toString()
  if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
    // 处理01变成1,并且不处理1.
    return parseFloat(num).toString()
  }
  return num.toString()
}

/** 判断值是否为空（null、undefined 或空字符串） */
function isEmptyValue(val: string | number | null | undefined): boolean {
  return isNil(val) || val === ''
}

const Stepper: React.FC<HuiStepperProps> = (props: HuiStepperProps) => {
  const [scaleAnimation, setScaleAnimation] = useState({
    plus: false,
    minus: false,
  })
  const {
    style,
    className = '',
    disabled = false,
    disabledInput = false,
    value = 0,
    type = 'number',
    width = 0,
    min = 0,
    max = Infinity,
    hideMinus = false,
    step = 1,
    allowEmpty = false,
    inputProps,
    onChange = () => {},
    onBlur = () => {},
  } = props

  const handleClick = (clickType: 'minus' | 'plus', e: CommonEvent): void => {
    const currentValue = isEmptyValue(value) ? min : Number(value)
    const lowThanMin = clickType === 'minus' && currentValue <= min
    const overThanMax = clickType === 'plus' && currentValue >= max
    // 极值判断
    if (lowThanMin || overThanMax || disabled) {
      setScaleAnimation({
        plus: false,
        minus: false,
      })
      const deltaValue = clickType === 'minus' ? -step : step
      const errorValue = addNum(Number(value), deltaValue)
      if (disabled) {
        handleError({
          type: 'DISABLED',
          errorValue,
        })
      } else {
        handleError({
          type: lowThanMin ? 'LOW' : 'OVER',
          errorValue,
        })
      }
      return
    }

    // 正常累加
    const deltaValue = clickType === 'minus' ? -step : step
    if (deltaValue > 0) {
      setScaleAnimation({
        plus: true,
        minus: false,
      })
    } else {
      setScaleAnimation({
        plus: false,
        minus: true,
      })
    }

    if (!disabled) {
      setTimeout(() => {
        setScaleAnimation({
          plus: false,
          minus: false,
        })
      }, 200)
    }

    let newValue = addNum(Number(value), deltaValue)
    newValue = Number(handleValue(newValue))
    onChange(newValue, e)
  }

  const handleValue = (val: string | number | null): string | null => {
    if (allowEmpty && isEmptyValue(val)) {
      return null
    }
    let resultValue: number | string = isEmptyValue(val) ? min : Number(val)
    // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
    if (resultValue > max) {
      resultValue = max
      handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }
    if (resultValue < min) {
      resultValue = min
      handleError({
        type: 'LOW',
        errorValue: resultValue,
      })
    }
    if (resultValue && !Number(resultValue)) {
      resultValue = parseFloat(resultValue.toString()) || min

      handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }

    resultValue = parseValue(resultValue.toString())
    return resultValue
  }

  const handleInput = (e: CommonEvent & ExtendEvent): string | void => {
    const { value: val } = e.target
    if (disabled) return

    const newValue = handleValue(val)
    onChange(
      // 避免影响老的数据类型
      isNil(newValue) ? (null as unknown as number) : Number(newValue),
      e,
    )
  }

  const handleBlur = (event: ITouchEvent): void => onBlur && onBlur(event)

  const handleError = (errorValue: InputError): void => {
    if (!props.onErrorInput) {
      return
    }
    props.onErrorInput(errorValue)
  }

  const inputStyle = {
    width: width ? `${pxTransform(width)}` : '',
  }

  const handledValue = handleValue(value)
  const inputValue = handledValue === null ? '' : String(handledValue)

  const { minusBtnCls, plusBtnCls } = useMemo(() => {
    const numericValue = handledValue === null ? min : Number(handledValue)

    const minusBtnClass = `hui-stepper-btn minus ${
      numericValue <= min || disabled ? 'hui-stepper-disabled' : ''
    }`
    const plusBtnClass = `hui-stepper-btn plus ${
      numericValue >= max || disabled ? 'hui-stepper-disabled' : ''
    }`

    return {
      minusBtnCls: minusBtnClass,
      plusBtnCls: plusBtnClass,
    }
  }, [handledValue, min, max, disabled])

  const initHideMinusAndInput = `${hideMinus && value === min ? 'hide' : ''}`

  const disableInputFormat = hideMinus
    ? !!(initHideMinusAndInput || disabledInput)
    : disabledInput

  return (
    <View
      className={`hui-stepper ${className} ${initHideMinusAndInput}`}
      style={style}
    >
      <View className={minusBtnCls} onClick={(e) => handleClick('minus', e)}>
        <View className={`btn ${scaleAnimation.minus ? 'active' : ''}`}>
          <Icon
            name='008-remove'
            size={20}
            style={{
              display: 'block',
              textAlign: 'center',
            }}
          />
        </View>
      </View>
      <HuiInput
        {...inputProps}
        inputClassName='hui-stepper-input'
        className='hui-stepper-input-element'
        inputStyle={inputStyle}
        type={type}
        value={inputValue}
        disabled={disableInputFormat || disabled}
        onInput={(e) => handleInput(e as CommonEvent & ExtendEvent)}
        onBlur={(e) => handleBlur(e as ITouchEvent)}
      />
      <View className={plusBtnCls} onClick={(e) => handleClick('plus', e)}>
        <View className={`btn ${scaleAnimation.plus ? 'active' : ''}`}>
          <Icon
            name='007-add'
            size={20}
            style={{
              display: 'block',
              textAlign: 'center',
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default Stepper
