import { View } from '@tarojs/components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { countCommonStrings } from '../../utils/common'
import HuiButton from '../Button/Button'
import Modal from '../Modal'
import SelectBody, {
  HuiSelectBodyProps,
  HuiSelectOption,
  Level,
  OptionValue,
} from './SelectBody/SelectBody'

export interface HuiSelectProps extends HuiSelectBodyProps {
  /** 是否展示 */
  visible: boolean
  /** 标题 */
  title?: React.ReactNode
  /** 关闭回调 */
  onClose?(): void
  /** 确认按钮文字 */
  confirmText?: string
  /** 确认回调 */
  onConfirm?(v: OptionValue<Level>): void
}

const Select: React.FC<HuiSelectProps> = (props) => {
  const {
    record,
    customBottom,
    visible,
    title,
    value,
    options,
    color,
    contentHeight,
    loading = false,
    level = 2,
    multiSelect = false,
    showBadge = false,
    confirmText = '确定',
    style,
    className = '',
    onClose,
    onChange,
    onConfirm,
    onChangeSideMenu,
  } = props

  const defaultValue = useMemo(
    () => (level === 2 ? (options ?? []).map(() => []) : []),
    [level, options],
  )

  const [optionValue, setOptionValue] = useState<OptionValue<Level>>(
    value || defaultValue,
  )

  useEffect(() => {
    if (!value) {
      return
    }
    if (level === 2) {
      const res = ((value as OptionValue<2>) ?? []).map((item, index) =>
        countCommonStrings(
          item,
          options?.[index]?.children
            ? ((options?.[index]?.children as HuiSelectOption[]) ?? []).map(
                (itemChild) => itemChild.value,
              )
            : [],
        ),
      )
      setOptionValue(res)
    }
    if (level === 1) {
      const res = countCommonStrings(
        value as OptionValue<1>,
        (options ?? []).map((item) => item.value),
      )
      setOptionValue(res)
    }
  }, [level, options, value])

  const handleChange = useCallback(
    (e) => {
      setOptionValue(e)
      onChange?.(e)
    },
    [onChange, setOptionValue],
  )

  return (
    <Modal
      visible={visible}
      title={title}
      className={className}
      style={style}
      onClose={onClose}
    >
      <View className='hui-select'>
        <SelectBody
          record={record}
          customBottom={customBottom}
          value={optionValue}
          options={options}
          color={color}
          contentHeight={contentHeight}
          loading={loading}
          level={level}
          multiSelect={multiSelect}
          showBadge={showBadge}
          onChange={handleChange}
          onChangeSideMenu={onChangeSideMenu}
        ></SelectBody>
        <View className='hui-select-footer'>
          <HuiButton
            block
            size='large'
            color={color}
            disabled={optionValue.length === 0}
            onClick={() => onConfirm && onConfirm(optionValue)}
          >
            {confirmText}
          </HuiButton>
        </View>
      </View>
    </Modal>
  )
}

export default Select
