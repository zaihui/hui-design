import React, { CSSProperties, ReactNode, useState, useRef } from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'
import MenuItem, { MenuItemOption } from '../MenuItem/MenuItem'
import HuiIcon from '../../Icon'
import './Menu.scss'

export interface MenuProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** 滚动时是否固定在顶部 */
  fixed?: boolean
  /** 透传到menu组件 当筛选项变化的时候调用 */
  menuOnChange?: (option: MenuItemOption) => void
}

const defaultProps = {
  className: '',
  style: {},
}

const generateUniqueId = () => {
  const timestamp = new Date().getTime().toString(36)
  const randomString = Math.random().toString(36).substr(2, 5)
  return `${timestamp}-${randomString}`
}

const Menu: React.FC<MenuProps> & { Item: typeof MenuItem } = props => {
  const { fixed, menuOnChange, className, children, ...rest } = props
  const menuRef = useRef()
  const [activatedList, setActivatedList] = useState<boolean[]>([])
  const [menuItemTitle, setMenuItemTitle] = useState<string[]>([])

  const toggleMenuItem = (index: number) => {
    const temp = [...activatedList]
    temp[index] = !temp[index]
    for (let i = 0; i < temp.length; i++) {
      temp[i] = i === index ? temp[i] : false
    }
    setActivatedList(temp)
  }

  const hideMenuItem = (index: number) => {
    const temp = [...activatedList]
    temp[index] = false
    setActivatedList(temp)
  }

  const updateMenuItemTitle = (index: number, text: string) => {
    const temp = [...menuItemTitle]
    temp[index] = text
    setMenuItemTitle(temp)
  }

  const renderMenuTitle = () => React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const { title, options, value } = child.props

      const selected = options?.filter(item => item.value === value)

      const getTitle = () => {
        if (title) return title
        if (menuItemTitle[index]) {
          return menuItemTitle[index]
        }
        return selected?.[0]?.text
      }

      return <View className={cx('hui-filter-menu-item', {
        active: activatedList[index],
      })}
        onClick={() => toggleMenuItem(index)}
      >
        <View className='hui-filter-menu-item-text'>{getTitle()}</View>
        <View className='hui-filter-menu-item-icon'>
          <HuiIcon name='010-choose' size={14} />
        </View>
      </View>
    }
    return null
  })

  const renderMenuItem = () => React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        parent: {
          index,
          show: activatedList[index],
          menuRef,
          hideMenuItem,
          updateMenuItemTitle,
          menuOnChange,
        },
      } as any)
    }
    return null
  })

  return <View {...rest}
    className={cx('hui-filter-menu', className, generateUniqueId(), { fixed })}
    ref={menuRef}
  >
    <View className={cx('hui-filter-menu-bar', {
      active: activatedList.includes(true),
    })}
    >
      {renderMenuTitle()}
    </View>
    {renderMenuItem()}
  </View>
}

Menu.defaultProps = defaultProps
Menu.displayName = 'Menu'
Menu.Item = MenuItem

export default Menu
