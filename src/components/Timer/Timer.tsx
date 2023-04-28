import React, { useRef, useState, useEffect } from 'react'
import { View, Block } from '@tarojs/components'
import dayjs from 'dayjs'
import cx from 'classnames'

import TimerItem from './item'

import { parseDurationToTime, getTimerFormatSeparator } from '../../utils'

import './Timer.scss'

export interface TimerData {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export interface HuiTimerProps {
  style?: React.CSSProperties
  className?: string
  /** 倒计时总时长，单位毫秒，非负数 */
  time?: number
  /** 向前计时开始时间 */
  startTime?: string
  /** 是否显示卡片式样式，默认为文字样式(卡片样式和文字样式) */
  isCard?: boolean
  /** 是否显示天数, 默认不显示 */
  isShowDay?: boolean
  /** 是否是倒计时，默认倒计时(向前计时和倒计时) */
  isCountDown?: boolean
  /** 格式化分割符号 */
  format?: string
  /** 倒计时结束时触发 */
  onFinished?: () => void
  /** 倒计时变化时触发 */
  onChange?: (timeData: TimerData) => void
}

const defaultProps = {
  onFinished: () => void 0,
  onChange: () => void 0,
}

const HuiTimer: React.FC<HuiTimerProps> = props => {
  const {
    className = '',
    style,
    time = 0,
    startTime = '',
    isCard = false,
    isShowDay = false,
    isCountDown = true,
    format = 'DD天 HH:mm:ss',
    onFinished = defaultProps.onFinished,
    onChange = defaultProps.onChange,
  } = props
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [remainingTime, setRemainingTime] = useState<TimerData>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const countDownMilliseconds = Math.max(0, time)
  const endTime = dayjs().add(countDownMilliseconds, 'ms')
  const currentTime = dayjs()
  const formatSeparator = getTimerFormatSeparator(format)

  const clear = () => {
    if (!timeoutId.current) {
      return
    }
    clearTimeout(timeoutId.current)
    timeoutId.current = null
  }

  const getDisplayTime = remain => ({
    days: parseDurationToTime(remain, 'DD'),
    hours: parseDurationToTime(remain, 'HH'),
    minutes: parseDurationToTime(remain, 'mm'),
    seconds: parseDurationToTime(remain, 'ss'),
  })

  const handleChange = remain => {
    setRemainingTime(getDisplayTime(remain))
    onChange(getDisplayTime(remain))
  }

  const countDown = () => {
    clear()
    const nowTime = dayjs()
    const remain = Math.max(endTime.diff(nowTime), 0)
    if (remain <= 0) {
      onFinished()
      return
    }
    handleChange(remain)
    timeoutId.current = setTimeout(countDown, 1000)
  }

  const forward = () => {
    clear()
    const nowTime = dayjs()
    const previousTime = startTime ? dayjs(startTime) : currentTime
    const remain = Math.max(nowTime.diff(previousTime), 0)
    handleChange(remain)
    timeoutId.current = setTimeout(forward, 1000)
  }

  useEffect(() => {
    if (isCountDown && time > 0) {
      countDown()
    } else {
      forward()
    }
    return () => clear()
  }, [time, isCountDown])

  return (
    <View
      style={style}
      className={cx(
        `hui-timer ${className}`,
        { 'card-timer': isCard },
      )}
    >
      {isShowDay && formatSeparator.day && (
        <TimerItem
          num={remainingTime.days}
          separator={isCard ? formatSeparator.day : <Block>{formatSeparator.day}&nbsp;</Block>}
        />
      )}
      <TimerItem num={remainingTime.hours} separator={formatSeparator.hour} />
      <TimerItem num={remainingTime.minutes} separator={formatSeparator.minute} />
      <TimerItem num={remainingTime.seconds} separator={formatSeparator.second} />
    </View>
  )
}

export default HuiTimer
