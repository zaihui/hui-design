import Taro, { NodesRef } from '@tarojs/taro'
import dayjs from 'dayjs'
import 'dayjs/plugin/duration'
import { DESIGN_WIDTH } from './constant'

export const pxTransform = (size: number): string => Taro.pxTransform(size, DESIGN_WIDTH)

export const selectorQueryClientRect = (
  selector: string,
): Promise<NodesRef.BoundingClientRectCallbackResult> =>
  new Promise(resolve => {
    const query = Taro.createSelectorQuery()
    query
      .select(selector)
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        resolve(res)
      })
      .exec()
  })

export const selectorQueryScrollOffset = (
  selector: string,
): Promise<NodesRef.ScrollOffsetCallbackResult> =>
  new Promise(resolve => {
    const query = Taro.createSelectorQuery()
    query
      .select(selector)
      .scrollOffset((res: NodesRef.ScrollOffsetCallbackResult) => {
        resolve(res)
      })
      .exec()
  })

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null
}

/**
 * 返回带透明度的rgba色值的字符串
 * @param {16进制色值} hexColor
 * @param {透明度} opacity
 */
export const addOpacityToHexColor = (hexColor: string, opacity = 1): string => {
  const rgb = hexToRgb(hexColor)
  if (!rgb) {
    return ''
  }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

/**
 * 返回字符|数字|最大值+
 * @param value
 * @param maxValue 最大值
 */
export const formatValue = (
  value: string | number | undefined,
  maxValue: number,
): string | number => {
  if (value === '' || value === null || value === undefined) return ''
  const numValue = +value
  if (Number.isNaN(numValue)) {
    return value
  }
  return numValue > maxValue ? `${maxValue}+` : numValue
}

/**
 * 将时长转换成格式
 * @param d 时长
 * @param format 格式
 */
export const parseDurationToTime = (d: number, format: string): string => {
  const duration = dayjs.duration(d)
  if (format.indexOf('DD') !== -1) {
    let days = String(Math.floor(duration.asDays()))
    if (days.length < 2) {
      days = '0'.concat(days)
    }
    format = format.replace('DD', days)
  }
  if (format.indexOf('HH') !== -1) {
    let hours = String(duration.hours())
    if (hours.length < 2) {
      hours = '0'.concat(hours)
    }
    format = format.replace('HH', hours)
  }
  if (format.indexOf('mm') !== -1) {
    let minutes = String(duration.minutes())
    if (minutes.length < 2) {
      minutes = '0'.concat(minutes)
    }
    format = format.replace('mm', minutes)
  }
  if (format.indexOf('ss') !== -1) {
    let seconds = String(duration.seconds())
    if (seconds.length < 2) {
      seconds = '0'.concat(seconds)
    }
    format = format.replace('ss', seconds)
  }
  return format
}

/**
 * 获取格式中的分隔符
 * @param format 格式
 */
export const getTimerFormatSeparator = (format = 'HH:mm:ss'): {
  day: string
  hour: string
  minute: string
  second: string
} => ({
  day: format.split('DD')?.[1]?.[0],
  hour: format.split('HH')?.[1]?.[0],
  minute: format.split('mm')?.[1]?.[0],
  second: format.split('ss')?.[1]?.[0],
})
