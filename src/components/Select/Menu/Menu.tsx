import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import React, { useState, createRef, useEffect, useMemo } from 'react'
import isEqual from 'lodash/isEqual'
import clone from 'lodash/clone'

import Checkbox, { HuiCheckboxRef } from '../../Checkbox'

import Radio from '../../Radio'
import List from '../../List'

const RadioGroup = Radio.Group
const ListItem = List.Item
const CheckboxGroup = Checkbox.Group

export interface HuiMenuOption {
  /** 选项名 */
  label: string
  /** 选项值 */
  value: string | number
}

export interface HuiMenuProps extends ViewProps {
  /** 是否需要全选 选项 只有在 multiSelect=true 时生效 */
  checkAll?: boolean
  /** 选项 */
  options: HuiMenuOption[]
  /** 当前选中的值 */
  value: (number | string)[]
  /** 是否支持多选, 默认为false，即单选 */
  multiSelect?: boolean
  /** 主题色 */
  color?: string
  /** 选中选项的回调 */
  onChange?(v: (number | string)[]): void
  /** 自定义item */
  record?: <T>(item: T, index?: number) => React.ReactNode
  /** 自定义bottom */
  menuCustomBottom?: React.ReactNode
}

const Menu: React.FC<HuiMenuProps> = (props) => {
  const {
    checkAll = false,
    options,
    value,
    color,
    multiSelect = false,
    onChange,
    record,
    menuCustomBottom,
  } = props

  const allValues = useMemo(() => options.map((item) => item.value), [options])
  const isAllChecked = useMemo(() => {
    const originalValue = clone(allValues).sort()
    const targetValue = clone(value).sort()
    return isEqual(originalValue, targetValue)
  }, [allValues, value])

  const handleChange = (v: (string | number)[]) => {
    if (!onChange) {
      return
    }
    const res: (string | number)[] = []
    options.forEach((item) => {
      if (v.includes(item.value)) {
        res.push(item.value)
      }
    })
    onChange(res)
  }

  const [refList, setRefList] = useState<React.RefObject<HuiCheckboxRef>[]>([])

  useEffect(() => {
    setRefList((refs) =>
      Array(options.length)
        .fill(0)
        .map((_, i) => refs[i] || createRef()),
    )
  }, [options.length])

  return (
    <View className='hui-select-menu'>
      {multiSelect ? (
        <CheckboxGroup
          value={value as string[]}
          onChange={(checkedList) =>
            handleChange(Array.from(new Set(checkedList)))
          }
        >
          {checkAll && options.length > 1 && (
            <ListItem
              title='全部'
              icon={<Checkbox color={color} value={1} checked={isAllChecked} />}
              onClick={() =>
                isAllChecked ? onChange?.([]) : onChange?.([...allValues])
              }
            />
          )}
          {options.map((item, index) => (
            <ListItem
              key={item.value}
              title={record ? record(item, index) : item.label}
              icon={
                <Checkbox
                  ref={refList[index]}
                  color={color}
                  key={item.value}
                  value={item.value}
                  checked={value.includes(item.value)}
                />
              }
              onClick={() => refList[index]?.current?.toggle()}
            />
          ))}
        </CheckboxGroup>
      ) : (
        <RadioGroup>
          {options.map((item, index) => (
            <ListItem
              key={item.value}
              title={record ? record(item, index) : item.label}
              icon={
                <Radio
                  color={color}
                  key={item.value}
                  value={item.value}
                  checked={value.includes(item.value)}
                />
              }
              onClick={() => handleChange([item.value])}
            />
          ))}
        </RadioGroup>
      )}
      {menuCustomBottom}
    </View>
  )
}

export default Menu
