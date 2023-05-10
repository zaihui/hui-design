import { View, Text } from '@tarojs/components'
import React, { useEffect, useState, useMemo, useContext } from 'react'
import cx from 'classnames'
import HuiPopup, { HuiPopupProps } from '../../Popup'
import { useBoundingClientRect } from '../../../utils/hooks'
import HuiIcon from '../../Icon'
import filterStore from './store'

import ActionFooter, { ActionFooterProps } from '../ActionFooter/ActionFooter'

import './FiltersContent.scss'
import FilterContext from '../context'

export interface FiltersContentProps
  extends HuiPopupProps,
    Omit<ActionFooterProps, 'hideMenu'> {
  /** 筛选内容 */
  contentClassName?: string
  contentStyle?: React.CSSProperties
  popupContentClassName?: string
  /** 筛选模式 */
  type?: 'single' | 'multiple'
  /** 筛选项是否展开 */
  filterVisible?: boolean
  filterItems: FilterItemProps[]
  onChange?: (val?: any) => void
  /** 点击遮罩层和筛选必用 */
  onClose?: () => void
}

export interface FilterItemProps {
  label: string
  name: string
  /** 筛选项的值 */
  value?: any
  children?: React.ReactNode
}

const prefix = 'filters-content'

const FiltersContent: React.FC<FiltersContentProps> = props => {
  const {
    contentClassName = '',
    contentStyle,
    position = 'right',
    popupContentClassName,
    type = 'single',
    filterVisible = true,
    filterItems = [{ label: '', name: '', value: '', children: '' }],
    onConfirm,
    onClose,
    visible,
    parent,
    ...rest
  } = props as any
  const { filters } = filterStore

  const context = useContext(FilterContext)

  const info = useBoundingClientRect(parent.filterRef)
  const positionStyle = useMemo(() => {
    if (info && position === 'top') {
      const top = context.isFixed ? 0 : info.top - context.scrollTop
      return {
        top: info.height + top,
      }
    }
    return {}
  }, [info, position, context.isFixed, context.scrollTop])

  const FilterItem: React.FC<FilterItemProps> = itemProps => {
    const { label = '筛选条件名称', name = '', value, children } = itemProps
    const [childrenVisible, setChildrenVisible] = useState<boolean>(
      filterVisible || false,
    )

    useEffect(() => {
      if (React.isValidElement(copyChildren)) {
        if (copyChildren.props.onChange) {
          if (
            type === 'single'
              && filters[name] !== null
              && filters[name] !== undefined
              && filters[name] !== value
          ) {
            onOk({ [name]: value })
          }
          filterStore.updateFilters({ [name]: value })
        }
      }
    }, [value, visible])

    const copyChildren = useMemo(
      () => children && React.cloneElement(children as any),
      [children],
    )

    return (
      <View className={`${prefix}-item`}>
        <View className={`${prefix}-item-title`}>
          <Text className={`${prefix}-item-title-label`}>{label}</Text>
          <View
            className={`${prefix}-item-title-toggle`}
            onClick={() => setChildrenVisible(!childrenVisible)}
          >
            <Text>收起</Text>
            <HuiIcon
              name='h011-downward'
              className={cx({
                upward: !childrenVisible,
                downward: childrenVisible,
              })}
            />
          </View>
        </View>
        <View
          className={cx(`${prefix}-item-content`, {
            [`${prefix}-item-content-active`]: childrenVisible,
          })}
        >
          {copyChildren}
        </View>
      </View>
    )
  }

  const onOk = singleFilter => {
    if (onConfirm) {
      onConfirm(type === 'single' ? singleFilter : filters)
      if (onClose) onClose()
    }
  }

  const actionButtonProps: ActionFooterProps = {
    confirmButtonProps: props.confirmButtonProps,
    clearButtonProps: props.clearButtonProps,
    confirmText: props.confirmText,
    clearText: props.clearText,
    onConfirm: props.onConfirm,
    onClear: props.onClear,
    hideMenu: onClose,
  }

  return (
    <>
      <HuiPopup
        visible={visible}
        position={position}
        contentClassName={`filters-default-popup-content ${popupContentClassName}`}
        contentStyle={positionStyle}
        maskStyle={positionStyle}
        onClose={() => {
          if (onClose) {
            filterStore.updateFilters({})
            onClose()
          }
        }}
        {...rest}
      >
        <View
          className={cx(`${prefix}-content ${position} ${contentClassName}`)}
          style={contentStyle}
        >
          {filterItems.length
            && filterItems.map((item, index) => (
              <FilterItem
                key={index}
                label={item.label}
                name={item.name}
                value={item.value}
              >
                {item.children}
              </FilterItem>
            ))}
        </View>
        {type === 'multiple' && <ActionFooter {...actionButtonProps} filters={filters} />}
      </HuiPopup>
    </>
  )
}

export default FiltersContent
