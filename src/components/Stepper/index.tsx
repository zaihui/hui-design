/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react'
import { ViewProps } from '@tarojs/components/types/View'
import { View, Input } from '@tarojs/components'
import { CommonEvent, CommonEventFunction, ITouchEvent } from '@tarojs/components/types/common'
import { pxTransform } from '../../utils'
import Icon from '../Icon/Icon'

export interface InputError {
  type: 'OVER' | 'LOW' | 'DISABLED'
  errorValue: number
}

type ExtendEvent = {
  target: {
    value: string | number
  }
}

export interface HuiStepperProps extends ViewProps {
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
   * 输入框值改变时触发的事件
   * @param {number} value 输入框当前值
   * @description 开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填
   */
  onChange: (value: number, e: CommonEvent) => void
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
  style?: React.CSSProperties
  className?: string
}

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
    onChange = () => {},
    onBlur = () => {},
  } = props

  const handleClick = (clickType: 'minus' | 'plus', e: CommonEvent): void => {
    const lowThanMin = clickType === 'minus' && value <= min
    const overThanMax = clickType === 'plus' && value >= max
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

  const handleValue = (val: string | number): string => {
    let resultValue = val === '' ? min : val
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
    onChange(Number(newValue), e)
  }

  const handleBlur = (event: ITouchEvent): void =>
    onBlur && onBlur(event)

  const handleError = (errorValue: InputError): void => {
    if (!props.onErrorInput) {
      return
    }
    props.onErrorInput(errorValue)
  }

  const inputStyle = {
    width: width ? `${pxTransform(width)}` : '',
  }

  const inputValue = Number(handleValue(value))

  const minusBtnCls = `hui-stepper-btn minus ${inputValue <= min || disabled ? 'hui-stepper-disabled' : ''}`
  const plusBtnCls = `hui-stepper-btn plus ${inputValue >= max || disabled ? 'hui-stepper-disabled' : ''}`

  const initHideMinusAndInput = `${hideMinus && value === min ? 'hide' : ''}`

  const disableInputFormat = hideMinus ? !!(initHideMinusAndInput || disabledInput) : disabledInput

  return (
    <View className={`hui-stepper ${className} ${initHideMinusAndInput}`} style={style}>
      <View
        className={minusBtnCls}
        onClick={e => handleClick('minus', e)}
      >
        <View
          className={`btn ${scaleAnimation.minus ? 'active' : ''}`}
        >
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
      <Input
        className='hui-stepper-input'
        style={inputStyle}
        type={type}
        value={String(inputValue)}
        disabled={disableInputFormat || disabled}
        onInput={e => handleInput(e as CommonEvent & ExtendEvent)}
        onBlur={e => handleBlur(e as ITouchEvent)}
      />
      <View
        className={plusBtnCls}
        onClick={e => handleClick('plus', e)}
      >
        <View
          className={`btn ${scaleAnimation.plus ? 'active' : ''}`}
        >
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
