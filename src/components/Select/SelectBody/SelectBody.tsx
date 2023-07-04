import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'

import Badge from '../../Badge'
import Loader from '../../Loader'
import Menu from '../Menu/Menu'
import SideMenu from '../SideMenu/SideMenu'
import { pxTransform } from '../../../utils'
import { countCommonStrings } from '../../../utils/common'

import './SelectBody.scss'

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

type HuiSelectCustom = <T>(item: T, index?: number) => React.ReactNode

export interface HuiSelectParentOption extends HuiSelectOption {
  /** 自定义 level 2 item */
  record?: HuiSelectCustom
  /** 自定义 level 2 底部元素 */
  customBottom?: React.ReactNode
}

export type Level = 1 | 2

export type OptionValue<T extends number> = T extends 2
  ? (string | number)[][]
  : (string | number)[]

export interface HuiSelectBodyProps extends ViewProps {
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
  value: OptionValue<Level>
  /** 自定义 level 1 item */
  record?: HuiSelectCustom
  /** 自定义 level 2 底部元素 */
  customBottom?: React.ReactNode
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
}

const SelectBody: React.FC<HuiSelectBodyProps> = (props) => {
  const {
    className,
    record,
    customBottom,
    value,
    options,
    color,
    contentHeight,
    loading = false,
    level = 2,
    multiSelect = false,
    showBadge = false,
    onChange,
    onChangeSideMenu,
  } = props

  const [activeMenu, setActiveMenu] = useState<string | number>(0)

  useEffect(() => {
    if (level === 1) {
      return
    }
    const initActiveMenu = value?.findIndex((item) => item.length) ?? 0
    const defaultActiveMenu = initActiveMenu === -1 ? 0 : initActiveMenu
    setActiveMenu(defaultActiveMenu ?? 0)
  }, [])

  const handleChangeSideMenu = (v) => {
    if (v !== activeMenu) {
      setActiveMenu(v)
      onChangeSideMenu && onChangeSideMenu(v)
    }
  }

  const handleChangeOption = (v) => {
    if (level === 1) {
      onChange && onChange(v)
    }
    if (level === 2) {
      const newValue = ((value as OptionValue<2>) ?? []).map((item, index) =>
        activeMenu === index ? v : item,
      )
      onChange && onChange(newValue)
    }
  }

  const menuOptions =
    level === 2 ? options?.[activeMenu]?.children || [] : options

  const menuRecord =
    level === 2 ? options?.[activeMenu]?.record || undefined : record

  const menuCustomBottom =
    level === 2
      ? options?.[activeMenu]?.customBottom || undefined
      : customBottom

  const menuValue = level === 2 ? value?.[activeMenu] || [] : value

  const getBadgeNumber = useCallback(
    (index, item) => {
      const res = countCommonStrings(
        (value as OptionValue<2>)?.[index],
        (item.children ?? []).map((itemChild) => itemChild.value),
      )
      return res.length || ''
    },
    [value],
  )

  return (
    <View
      className={cx(className, 'hui-select-body')}
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
          {(options ?? []).map((item, index) => (
            <SideMenuItem key={item.value} value={index}>
              {showBadge && multiSelect ? (
                <Badge value={getBadgeNumber(index, item)}>
                  {record ? record(item, index) : item.label}
                </Badge>
              ) : record ? (
                record(item, index)
              ) : (
                item.label
              )}
            </SideMenuItem>
          ))}
          {customBottom}
        </SideMenu>
      )}
      <Loader loading={loading} type='module' style={{ height: 'unset' }}>
        <Menu
          menuCustomBottom={menuCustomBottom}
          color={color}
          multiSelect={multiSelect}
          options={menuOptions}
          value={menuValue}
          onChange={handleChangeOption}
          record={menuRecord}
        ></Menu>
      </Loader>
    </View>
  )
}

export default SelectBody
