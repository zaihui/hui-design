import React, { CSSProperties, ReactNode, useState, useRef, useImperativeHandle, forwardRef, useContext } from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'
import MenuItem, { MenuItemOption } from '../MenuItem/MenuItem'
import HuiIcon from '../../Icon'
import { generateUniqueId } from '../utils'
import FilterContext from '../context'

export interface MenuProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** 透传到menu组件 当筛选项变化的时候调用 */
  menuOnChange?: (option: MenuItemOption) => void
}

export interface MenuRef {
  hide: () => void
}

const defaultProps = {
  className: '',
  style: {},
}

const InternalMenu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const { menuOnChange, className, children, ...rest } = props
  const menuRef = useRef()
  const [activatedList, setActivatedList] = useState<boolean[]>([])
  const [menuItemTitle, setMenuItemTitle] = useState<string[]>([])

  const context = useContext(FilterContext)

  const toggleMenuItem = (index: number) => {
    const temp = [...activatedList]
    temp[index] = !temp[index]
    for (let i = 0; i < temp.length; i++) {
      temp[i] = i === index ? temp[i] : false
    }
    setActivatedList(temp)
    context?.hideFilter()
  }

  const hideMenuItem = (index: number) => {
    const temp = [...activatedList]
    temp[index] = false
    setActivatedList(temp)
  }

  useImperativeHandle(ref, () => ({
    hide: () => {
      setActivatedList([])
    },
  }))

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

      const clipText = (text: string) => {
        if (text.length > 6) {
          return `${text.substring(0, 6)}...`
        } else {
          return text
        }
      }

      return <View className={cx('hui-filter-menu-item', {
        active: activatedList[index],
      })}
        onClick={() => toggleMenuItem(index)}
      >
        <View className='hui-filter-menu-item-text'>{clipText(getTitle())}</View>
        <View className='hui-filter-menu-item-icon'>
          <HuiIcon name='h110-upwards' size={14} />
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
    className={cx('hui-filter-menu', className, generateUniqueId())}
    ref={menuRef}
  >
    <View className='hui-filter-menu-bar'>
      {renderMenuTitle()}
    </View>
    {renderMenuItem()}
  </View>
})

InternalMenu.defaultProps = defaultProps

type CompoundedComponent = React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<MenuRef>>
  & {
    Item: typeof MenuItem
  }

const Menu = InternalMenu as CompoundedComponent

Menu.Item = MenuItem

export default Menu
