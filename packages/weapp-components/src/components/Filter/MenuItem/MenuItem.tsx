import { ITouchEvent, View } from '@tarojs/components'
import { usePageScroll } from '@tarojs/taro'
import cx from 'classnames'
import React, {
  CSSProperties,
  ReactNode,
  useImperativeHandle,
  useMemo,
} from 'react'
import Popup from '../../Popup'
import ActionFooter, { ActionFooterProps } from '../ActionFooter/ActionFooter'

export interface MenuItemOption {
  value: string | number
  text: string
}

export interface MenuItemProps extends Omit<ActionFooterProps, 'hideMenu'> {
  /** 菜单标题 */
  title?: string
  /** 下拉列表选项 */
  options?: MenuItemOption[]
  /** 一行展示多少列 */
  columns?: number
  /** 选中的值 */
  value?: string | number
  /** 菜单标题右侧icon */
  icon?: React.ReactNode
  /** 能否展开当前列表选项 */
  disabled?: boolean
  /** option改变的回调 */
  onChange?: (option: MenuItemOption) => void
  /** 关闭mask回调 */
  onMaskClose?: (e?: ITouchEvent) => void
  /** 下拉框底部筛选 */
  footer?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode | ((props: { hideMenu: () => void }) => ReactNode)
}

const defaultProps = {
  className: '',
  style: {},
  columns: 1,
}

const MenuItem = React.forwardRef((props: MenuItemProps, ref) => {
  const {
    title,
    options,
    columns,
    onChange,
    className,
    style,
    parent,
    children,
    footer,
    onMaskClose,
  } = props as any

  const position = useMemo(() => {
    if (parent.filterTop) {
      return {
        top: parent.filterTop,
      }
    }
    return {}
  }, [parent])

  useImperativeHandle(ref, () => ({ hideMenu }))

  usePageScroll(() => {
    if (parent.show) hideMenu()
  })

  const hideMenu = () => {
    parent.hideMenuItem(parent.index)
  }

  const updateTitle = (text: string) => {
    if (!title) {
      parent.updateMenuItemTitle(parent.index, text)
    }
  }

  const handleClick = (item) => {
    hideMenu()
    updateTitle(item.text)
    onChange && onChange(item)
    parent.menuOnChange && parent.menuOnChange(item)
  }

  const renderOptions = () => {
    if (options) {
      return options.map((item, index) => (
        <View
          className='hui-filter-menu-item-option'
          key={index}
          onClick={() => handleClick(item)}
          style={{ flexBasis: `${100 / columns}%` }}
        >
          {item.text}
        </View>
      ))
    }
    return null
  }

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ hideMenu })
    }
    return children
  }

  const actionFooterProps: ActionFooterProps = {
    confirmButtonProps: props.confirmButtonProps,
    clearButtonProps: props.clearButtonProps,
    confirmText: props.confirmText,
    clearText: props.clearText,
    onConfirm: props.onConfirm,
    onClear: props.onClear,
    hideMenu,
  }

  return (
    <Popup
      visible={parent.show}
      position='top'
      maskStyle={position}
      contentStyle={position}
      onClose={() => {
        hideMenu()
        onMaskClose && onMaskClose()
      }}
      className={cx('hui-filter-animation', {
        'no-animation': !parent.show,
      })}
    >
      <View
        className={cx(className)}
        style={{
          ...style,
        }}
      >
        <View
          className={cx('hui-filter-menu-item-content', {
            'is-footer': options,
          })}
        >
          {!options ? renderChildren() : renderOptions()}
        </View>
        {footer && <ActionFooter {...actionFooterProps} />}
      </View>
    </Popup>
  )
})

MenuItem.defaultProps = defaultProps
export default MenuItem