import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import cx from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { CommonEvent } from '@tarojs/components/types/common'
import HuiDivider from '../Divider'

export interface HuiPickerColumn<T> { [key: string]: T }
export interface HuiPickerProps {
  className?: string
  style?: React.CSSProperties
  visible?: boolean
  onClose?: (event?: CommonEvent) => void
  title?: string
  cancelText?: string
  cancelStyle?: React.CSSProperties
  confirmText?: string
  confirmStyle?: React.CSSProperties
  /** eg: [
   *        [{text: '第一列选项1'}],
   *        [{text: '第二列选项1'}, {text: '第二列选项2'}]
   *      ]
   * 需要传入的用于渲染的数据列表，每一项需要有text属性用来展示文案用
  */
  columns: HuiPickerColumn<string>[][]
  /** 相应column的默认选中项索引 */
  current?: number[]
  /**
   * @param {*} arg 返回各个column当前选中项的index
   * @param {*} arg2 当前更改的column索引
   * @memberof HuiPickerProps
   */
  onChange?(arg, arg2): void
  onConfirm?(arg): void
}
const handleTouchMove = (e: CommonEvent) => {
  e.stopPropagation()
  e.preventDefault()
}
const prefix = 'hui-picker'
// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = () => {}
const Picker: React.FC<HuiPickerProps> = props => {
  const {
    className,
    style,
    visible = false,
    onClose,
    title,
    cancelText = '取消',
    cancelStyle,
    confirmStyle,
    confirmText = '确定',
    current = [],
    columns = [],
    onChange = empty,
    onConfirm = empty,
  } = props
  const [isOpened, setIsOpened] = useState(false)
  const valueRef = useRef<number[]>(current)
  const rootClass = cx(className, prefix, {
    [`${prefix}-active`]: isOpened,
  })

  useEffect(() => {
    setIsOpened(visible)
    if (!visible) {
      doClose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const doClose = (e?: CommonEvent) => {
    if ('visible' in props && typeof onClose === 'function') {
      onClose(e)
    }
  }

  const handleClose = e => {
    setIsOpened(false)
    doClose(e)
  }

  const handleChange = e => {
    const value = e.detail.value
    if (valueRef.current.length === 0) {
      valueRef.current = Array(value.length).fill(0)
    }

    let changedColumn
    value.some((_, i) => {
      if (value[i] !== valueRef.current[i]) {
        changedColumn = i
        return true
      }
      return false
    })
    valueRef.current = value
    onChange(value, changedColumn)
  }
  return (
    <View
      className={rootClass}
      style={style}
      onTouchMove={handleTouchMove}
    >
      <View onClick={handleClose} className={`${prefix}-mask`} />
      <View className={`${prefix}-container`}>
        <View className={`${prefix}-content`}>
          <View className={`${prefix}-header`}>
            {cancelText && (
              <View
                className={`${prefix}-header-cancel`}
                style={cancelStyle}
                onClick={onClose}
              >{cancelText}
              </View>
            )}
            {title && <View className={`${prefix}-header-title`}>{title}</View>}
            {confirmText && (
              <View
                className={`${prefix}-header-confirm`}
                style={confirmStyle}
                onClick={() => onConfirm(valueRef.current)}
              >{confirmText}
              </View>
            )}
          </View>
          <HuiDivider />
          <View className={`${prefix}-body`}>
            <PickerView
              indicatorStyle='height: 50px'
              style={{ width: '100%', height: Taro.pxTransform(250) }}
              value={valueRef.current}
              onChange={handleChange}
            >
              {columns.map((option, i) => (
                <PickerViewColumn key={i}>
                  {option.map((obj, j) => (
                    <View className={`${prefix}-body-item`} key={j}>
                      {obj.text}
                    </View>
                  ))}
                </PickerViewColumn>
              ))}
            </PickerView>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Picker
