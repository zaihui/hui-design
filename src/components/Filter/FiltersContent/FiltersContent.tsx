import Taro from '@tarojs/taro'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import React, { useEffect, useState, useMemo, useContext } from 'react'
import cx from 'classnames'
import HuiPopup, { HuiPopupProps } from '../../Popup'
import { useBoundingClientRect } from '../../../utils/hooks'
import HuiButton from '../../Button'
import HuiIcon from '../../Icon'
import filterStore from './store'

import './FiltersContent.scss'
import FilterContext from '../context'

export interface FiltersContentProps extends HuiPopupProps {
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
  /** 筛选 */
  onConfirm?: (val?: any) => void
  /** 点击遮罩层和筛选必用 */
  onClose?: () => void
}

export interface FilterItemProps {
  label: string
  name: string
  /** 筛选项的值 */
  value?: any
  onConfirm?: () => void
  children?: React.ReactNode
}

const prefix = 'filters-content'

const FiltersContent: React.FC<FiltersContentProps> = props => {
  const {
    contentClassName = '',
    contentStyle,
    position = 'right',
    popupContentClassName = 'fitlers-default-popup-content',
    type = 'single',
    filterVisible = true,
    filterItems = [{ label: '', name: '', value: '', children: '' }],
    onConfirm,
    onClose,
    visible,
    parent,
    ...rest
  } = props as any
  const { filters, updateFilters } = filterStore
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
      if (!visible) return
      if (React.isValidElement(copyChildren)) {
        if (copyChildren.props.onChange) {
          updateFilters && updateFilters({ [name]: value })

          Taro.nextTick(() => {
            if (
              type === 'single'
              && filters[name] !== null
              && filters[name] !== undefined
              && value !== filters[name]
            ) {
              onOk(name)
            }
          })
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

  const onOk = name => {
    if (onConfirm) {
      onConfirm(type === 'single' ? filters[name] : filters)
      if (onClose) onClose()
    }
  }

  const ActionFooter = useMemo(
    () => (
      <View className={`action-container ${position}`}>
        <HuiButton
          className='filters-button'
          type='secondary'
          radiusType='square'
          color='#111111'
          style={{
            borderColor: '#DDDDDD',
          }}
          onClick={() => {
            filterStore.updateFilters({})
          }}
        >
          清空筛选项
        </HuiButton>
        <HuiButton
          radiusType='square'
          color='#1569EE'
          className='filters-button'
          onClick={() => onOk('')}
        >
          筛选
        </HuiButton>
      </View>
    ),
    [filters, position],
  )

  return (
    <>
      <HuiPopup
        visible={visible}
        position={position}
        contentClassName={`fitlers-default-popup-content ${popupContentClassName}`}
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
        {type === 'multiple' && ActionFooter}
      </HuiPopup>
    </>
  )
}

export default observer(FiltersContent)
