import { View, Text } from '@tarojs/components'
import React, { useState, useMemo, useContext } from 'react'
import cx from 'classnames'
import HuiPopup, { HuiPopupProps } from '../../Popup'
import { useBoundingClientRect } from '../../../utils/hooks'
import HuiIcon from '../../Icon'

import ActionFooter, { ActionFooterProps } from '../ActionFooter/ActionFooter'

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
  filterItems?: FilterItemProps[]
  onChange?: (val?: any) => void
  /** 点击遮罩层和筛选必用 */
  onClose?: () => void
}

export interface FilterItemProps {
  label: string
  name: string
  children?: React.ReactNode
}

const prefix = 'filters-content'

const FiltersContent: React.FC<FiltersContentProps> = props => {
  const {
    contentClassName = '',
    contentStyle,
    position = 'right',
    popupContentClassName,
    filterVisible = true,
    filterItems = [{ label: '', name: '', value: '', children: '' }],
    onClose,
    visible,
    parent,
    ...rest
  } = props as any

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
    const { label = '筛选条件名称', children } = itemProps
    const [childrenVisible, setChildrenVisible] = useState<boolean>(
      filterVisible || false,
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
          {children}
        </View>
      </View>
    )
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
      <HuiPopup
        className={cx('filters-default-popup-wrapper', { 'no-animation': position === 'top' })}
        visible={visible}
        position={position}
        contentClassName={cx('filters-default-popup-content', { popupContentClassName })}
        contentStyle={positionStyle}
        maskStyle={positionStyle}
        onClose={() => {
          if (onClose) {
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
              >
                {item.children}
              </FilterItem>
            ))}
        </View>
         <ActionFooter {...actionButtonProps} />
      </HuiPopup>
  )
}

export default FiltersContent
