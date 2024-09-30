import { View } from '@tarojs/components'
import cx from 'classnames'
import React, { useMemo } from 'react'
import HuiPopup, { HuiPopupProps } from '../../Popup'

import ActionFooter, { ActionFooterProps } from '../ActionFooter/ActionFooter'

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
    ...rest
  } = props as any

  const maskStyle = useMemo(() => {
    if (position !== 'top') return {}
    return {
      position: 'absolute',
      height: '100vh',
    } as React.CSSProperties
  }, [position])

  const positionStyle = useMemo(() => {
    if (position !== 'top') return {}
    return {
      position: 'absolute',
      height: 'auto',
    } as React.CSSProperties
  }, [position])

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
      className={cx('hui-filter-animation', 'hui-filter-filters', {
        'no-animation': position === 'top' && !visible,
      })}
      visible={visible}
      position={position}
      contentClassName={cx({
        popupContentClassName,
      })}
      contentStyle={positionStyle}
      maskStyle={maskStyle}
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
        {visible && filterContent}
      </View>
      <ActionFooter {...actionButtonProps} />
    </HuiPopup>
  )
}

export default FiltersContent
