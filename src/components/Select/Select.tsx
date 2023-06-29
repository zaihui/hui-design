import { View } from '@tarojs/components'
import React, { useState } from 'react'

import HuiButton from '../Button/Button'
import Modal from '../Modal'
import SelectBody, {
  HuiSelectBodyProps,
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

  const [optionValue, setOptionValue] = useState<OptionValue<Level>>(
    value || defaultValue,
  )

  const isDisabled =
    level === 2
      ? !!(value as OptionValue<2>).filter((item) => !!item.length).length
      : !!value.length

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
          value={value}
          options={options}
          color={color}
          contentHeight={contentHeight}
          loading={loading}
          level={level}
          multiSelect={multiSelect}
          showBadge={showBadge}
          onChange={onChange}
          onChangeSideMenu={onChangeSideMenu}
        ></SelectBody>
        <View className='hui-select-footer'>
          <HuiButton
            block
            size='large'
            color={color}
            disabled={isDisabled}
            onClick={() => onConfirm && onConfirm(value)}
          >
            {confirmText}
          </HuiButton>
        </View>
      </View>
    </Modal>
  )
}

export default Select
