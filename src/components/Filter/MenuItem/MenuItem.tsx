import React, { CSSProperties, ReactNode, useEffect, useImperativeHandle, useMemo } from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { useBoundingClientRect } from '../../../utils/hooks'
import { HuiButtonProps } from '../../Button'

import Mask from '../../Mask'
import './MenuItem.scss'

export interface MenuItemOption {
  value: string | number
  text: string
}

export interface MenuItemProps {
  // 菜单标题
  title?: string
  // 下拉列表选项
  options?: MenuItemOption[]
  // 一行展示多少列
  columns?: number
  // 选中的值
  value?: string | number
  // option改变的回调
  onChange?: (option: MenuItemOption) => void
  // 下拉框底部内容
  footer?: ReactNode
  // 确认按钮文字
  okText?: ReactNode
  // 清空筛选项文字
  clearText?: ReactNode
  // 确认按钮的props
  okButtonProps?: HuiButtonProps
  // 清空筛选项按钮的props
  clearButtonProps?: HuiButtonProps
  className?: string
  style?: CSSProperties
  children?: ReactNode | ((props: {hideMenu: () => void}) => ReactNode)
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
  } = props as any

  const info = useBoundingClientRect(parent.menuRef)
  const position = useMemo(() => {
    if (info) {
      return {
        top: info.top + info.height,
      }
    }
    return {}
  }, [info])

  useImperativeHandle(
    ref,
    () => ({ hideMenu }),
  )

  // 控制body是否可以滚动
  useEffect(() => {

  }, [parent.show])

  const getDisplay = () => {
    if (parent.show) return {}
    return { display: 'none' }
  }

  const hideMenu = () => {
    parent.hideMenuItem(parent.index)
  }

  const updateTitle = (text: string) => {
    if (!title) {
      parent.updateMenuItemTitle(parent.index, text)
    }
  }

  const handleClick = item => {
    hideMenu()
    updateTitle(item.text)
    onChange && onChange(item)
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

  return (
    <>
      <Mask visible={parent.show} onClose={hideMenu} style={position} />
      <View className={cx('hui-filter-menu-item-wrap', className)} style={{
        ...style,
        ...getDisplay(),
      }}
      >
        <View className={cx('hui-filter-menu-item-content', {
          // options 的时候默认加了padding
          'is-options': options,
        })}
        >
          {!options ? renderChildren() : renderOptions()}
        </View>
        <View className='hui-filter-menu-item-footer'>

        </View>
      </View>
    </>
  )
})

MenuItem.defaultProps = defaultProps
export default MenuItem
