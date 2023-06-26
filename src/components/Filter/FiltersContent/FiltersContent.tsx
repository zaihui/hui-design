import { View } from '@tarojs/components'
import cx from 'classnames'
import React, { useContext, useMemo } from 'react'
import { useBoundingClientRect } from '../../../utils/hooks'
import HuiPopup, { HuiPopupProps } from '../../Popup'

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
  onChange?: (val?: any) => void
  /** 点击遮罩层和筛选必用 */
  onClose?: () => void
  filterContent?: React.ReactNode
}

const prefix = 'filters-content'

const FiltersContent: React.FC<FiltersContentProps> = (props) => {
  const {
    contentClassName = '',
    contentStyle = {},
    position = 'right',
    popupContentClassName,
    filterContent,
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
  }, [info, position, context.isFixed, context.scrollTop, visible])

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
      className={cx('hui-filter-animation', {
        'no-animation': position === 'top' && !visible,
      })}
      visible={visible}
      position={position}
      contentClassName={cx({
        popupContentClassName,
      })}
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
        className={cx(
          `filters-default-popup-content ${prefix}-content ${position} ${contentClassName}`,
        )}
        style={contentStyle}
      >
        {filterContent}
      </View>
      <ActionFooter {...actionButtonProps} />
    </HuiPopup>
  )
}

export default FiltersContent
