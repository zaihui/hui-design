import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import React, { useState, createRef } from 'react'

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
}

const Menu: React.FC<HuiMenuProps> = props => {
  const { options, value, color, multiSelect = false, onChange } = props
  const handleChange = (v: (string | number)[]) => {
    if (!onChange) {
      return
    }
    onChange(v)
  }

  const [refList, setRefList] = useState<React.RefObject<HuiCheckboxRef>[]>([])
  React.useEffect(() => {
    setRefList(refs => (
      Array(options.length).fill(0).map((_, i) => refs[i] || createRef())
    ))
  }, [options.length])

  return (
    <View className='hui-select-menu'>
      {multiSelect ? (
        <CheckboxGroup
          value={value as string[]}
          onChange={checkedList =>
            handleChange(Array.from(new Set(checkedList)))
          }
        >
          {options.map((item, index) => (
            <ListItem
              key={item.value}
              title={item.label}
              icon={(
                <Checkbox
                  ref={refList[index]}
                  color={color}
                  key={item.value}
                  value={`${item.value}`}
                  checked={value.includes(item.value)}
                />
              )}
              onClick={() => refList[index]?.current?.toggle()}
            />
          ))}
        </CheckboxGroup>
      ) : (
        <RadioGroup>
          {options.map(item => (
            <ListItem
              key={item.value}
              title={item.label}
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
    </View>
  )
}

export default Menu
