import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import React, { useEffect, useMemo, useState } from 'react'

import Badge from '../Badge'
import HuiButton from '../Button/Button'
import Loader from '../Loader'
import Modal from '../Modal'
import Menu from './Menu/Menu'
import SideMenu from './SideMenu/SideMenu'
import { pxTransform } from '../../utils'

const SideMenuItem = SideMenu.Item

export interface HuiSelectOption {
  /** 选项名 */
  label: string
  /** 选项值 */
  value: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 子选项 */
  children?: HuiSelectOption[]
}

type HuiSelectRecord = <T>(item: T, index?: number) => React.ReactNode

export interface HuiSelectParentOption extends HuiSelectOption {
  /** 自定义 level 2 item */
  record?: HuiSelectRecord
}

export type Level = 1 | 2

export type OptionValue<T extends number> = T extends 2
  ? (string | number)[][]
  : (string | number)[]

export interface HuiSelectProps extends ViewProps {
  /** 是否展示 */
  visible: boolean
  /** 标题 */
  title?: React.ReactNode
  /** 关闭回调 */
  onClose?(): void
  /** 菜单层级，默认为2 */
  level?: Level
  /** 是否支持多选, 默认为false，即单选 */
  multiSelect?: boolean
  /** 是否展示徽标，level为2 且 multiSelect为true时生效 */
  showBadge?: boolean
  /** 选项 */
  options: HuiSelectParentOption[]
  /**
   * 选中值
   * 一级菜单时为选中项的value
   * 二级菜单时为所有子选项的value
   * */
  value?: OptionValue<Level>
  /** 自定义 level 1 item */
  record?: HuiSelectRecord
  /** 确认按钮文字 */
  confirmText?: string
  /** 主题色设置 */
  color?: string
  /** 开启异步加载画面 */
  loading?: boolean
  /** hui-select-body的高度，默认由内容撑开，可以选择设置 */
  contentHeight?: number
  style?: React.CSSProperties
  className?: string
  /** 选中选项时的回调 */
  onChange?(v: OptionValue<Level>): void
  /** level为2时，切换侧边菜单时的回调 */
  onChangeSideMenu?(v: number | string): void
  /** 确认回调 */
  onConfirm?(v: OptionValue<Level>): void
}

const Select: React.FC<HuiSelectProps> = (props) => {
  const {
    record,
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
    () => (level === 2 ? options.map(() => []) : [1]),
    [level, options],
  )

  const [activeMenu, setActiveMenu] = useState<string | number>(0)
  const [optionValue, setOptionValue] = useState<OptionValue<Level>>(
    value || defaultValue,
  )

  useEffect(() => {
    if (!value) {
      return
    }
    setOptionValue(value)
  }, [value, visible])

  useEffect(() => {
    if (level === 1) {
      return
    }
    const initActiveMenu = value?.findIndex((item) => item.length)
    const defaultActiveMenu = initActiveMenu === -1 ? 0 : initActiveMenu
    setActiveMenu(defaultActiveMenu ?? 0)
  }, [level, options, value, visible])

  const handleChangeSideMenu = (v) => {
    if (v !== activeMenu) {
      setActiveMenu(v)
      onChangeSideMenu && onChangeSideMenu(v)
    }
  }

  const handleChangeOption = (v) => {
    if (level === 1) {
      setOptionValue(v)
      onChange && onChange(v)
    }
    if (level === 2) {
      const newValue = (optionValue as OptionValue<2>).map((item, index) =>
        activeMenu === index ? v : item,
      )
      setOptionValue(newValue)
      onChange && onChange(newValue)
    }
  }

  const menuOptions =
    level === 2 ? options?.[activeMenu]?.children || [] : options

  const menuRecord =
    level === 2 ? options?.[activeMenu]?.record || undefined : record

  const menuValue = level === 2 ? optionValue?.[activeMenu] || [] : optionValue

  return (
    <Modal
      visible={visible}
      title={title}
      className={className}
      style={style}
      onClose={onClose}
    >
      <View className='hui-select'>
        <View
          className='hui-select-body'
          style={{
            height: (contentHeight && pxTransform(contentHeight)) || 'unset',
          }}
        >
          {level === 2 && (
            <SideMenu
              indicatorColor={color}
              active={activeMenu}
              onChange={(v) => handleChangeSideMenu(v)}
            >
              {options.map((item, index) => (
                <SideMenuItem key={item.value} value={index}>
                  {record ? (
                    record(item, index)
                  ) : showBadge && multiSelect ? (
                    <Badge
                      value={
                        (optionValue as OptionValue<2>)?.[index]?.length === 0
                          ? ''
                          : (optionValue as OptionValue<2>)?.[index]?.length
                      }
                    >
                      {item.label}
                    </Badge>
                  ) : (
                    item.label
                  )}
                </SideMenuItem>
              ))}
            </SideMenu>
          )}
          <Loader loading={loading} type='module' style={{ height: 'unset' }}>
            <Menu
              color={color}
              multiSelect={multiSelect}
              options={menuOptions}
              value={menuValue}
              onChange={handleChangeOption}
              record={menuRecord}
            ></Menu>
          </Loader>
        </View>
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
