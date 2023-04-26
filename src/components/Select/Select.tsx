import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import React, { useEffect, useState } from 'react'

import Badge from '../Badge'
import HuiButton from '../Button/Button'
import Loader from '../Loader'
import Modal from '../Modal'
import Menu from './Menu/Menu'
import SideMenu from './SideMenu/SideMenu'
import { pxTransform } from '../../utils'

const SideMenuItem = SideMenu.Item

interface HuiSelectOption {
  /** 选项名 */
  label: string
  /** 选项值 */
  value: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 子选项 */
  children?: HuiSelectOption[]
}

export interface HuiSelectProps extends ViewProps {
  /** 是否展示 */
  visible: boolean
  /** 标题 */
  title?: React.ReactNode
  /** 关闭回调 */
  onClose?(): void
  /** 菜单层级，默认为2 */
  level?: 1 | 2
  /** 是否支持多选, 默认为false，即单选 */
  multiSelect?: boolean
  /** 是否展示徽标，level为2 且 multiSelect为true时生效 */
  showBadge?: boolean
  /** 选项 */
  options: HuiSelectOption[]
  /**
   * 选中值
   * 一级菜单时为选中项的value
   * 二级菜单时为所有子选项的value
   * */
  value?: (string | number)[]
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
  onChange?(v: (number | string)[]): void
  /** level为2时，切换侧边菜单时的回调 */
  onChangeSideMenu?(v: number | string): void
  /** 确认回调 */
  onConfirm?(v: (number | string)[]): void
}

const Select: React.FC<HuiSelectProps> = props => {
  const {
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

  const [activeMenu, setActiveMenu] = useState<string | number>(0)
  const [optionValue, setOptionValue] = useState(value || [])

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
    const initActiveMenu = options.find(
      item => item.children?.some(ic => value?.includes(ic.value)),
    )?.value
    const defalutActiveMenu = options.length > 0 ? options[0].value : 0
    setActiveMenu(initActiveMenu ?? defalutActiveMenu)
  }, [level, options, value, visible])

  const handleChangeSideMenu = v => {
    if (v !== activeMenu) {
      setActiveMenu(v)
      onChangeSideMenu && onChangeSideMenu(v)
    }
  }

  const handleChangeOption = v => {
    setOptionValue(v)
    onChange && onChange(v)
  }

  const getBadgeNumber = list =>
    list?.map(o => optionValue.includes(o.value)).filter(o => !!o).length

  const menuOptions = level === 2
    ? options.find(item => item.value === activeMenu)?.children || []
    : options

  return (
    <Modal
      visible={visible}
      title={title}
      className={className}
      style={style}
      onClose={onClose}
    >
      <View className='hui-select'>
        <View className='hui-select-body' style={{
          height: contentHeight && pxTransform(contentHeight) || 'unset',
        }}
        >
          {level === 2 && (
            <SideMenu
              indicatorColor={color}
              active={activeMenu}
              onChange={v => handleChangeSideMenu(v)}
            >
              {options.map(item => (
                <SideMenuItem key={item.value} value={item.value}>
                  {showBadge && multiSelect ? (
                    <Badge
                      value={
                        getBadgeNumber(item.children) === 0
                          ? ''
                          : getBadgeNumber(item.children)
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
              value={optionValue}
              onChange={handleChangeOption}
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
