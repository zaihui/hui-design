import React, {
  CSSProperties,
  Fragment,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
  useCallback,
} from 'react'
import { View, ITouchEvent } from '@tarojs/components'
import cx from 'classnames'
import MenuItem, { MenuItemOption, MenuItemProps } from '../MenuItem/MenuItem'
import HuiIcon from '../../Icon'
import FilterContext from '../context'

export interface MenuProps {
  className?: string
  style?: CSSProperties
  /** 是否保持 menu 展开状态，而不随页面滚动而关闭 */
  holdOpen?: boolean
  /** 透传到menu组件 当筛选项变化的时候调用 */
  menuOnChange?: (option: MenuItemOption) => void
  /** 点击menu title */
  onMenuTitleClick?: (e: ITouchEvent, index: number, maskShow: boolean) => void
  menuItems?: MenuItemProps[]
}

export interface MenuRef {
  hide: () => void
}

const defaultProps = {
  className: '',
  style: {},
}

const InternalMenu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const {
    menuOnChange,
    onMenuTitleClick,
    className,
    menuItems,
    holdOpen = false,
    ...rest
  } = props
  const menuRef = useRef()
  const [activatedList, setActivatedList] = useState<boolean[]>([])
  const [menuItemTitle, setMenuItemTitle] = useState<string[]>([])

  const context = useContext(FilterContext)

  const toggleMenuItem = (index: number, disabled: boolean, e: ITouchEvent) => {
    if (disabled) return
    const temp = [...activatedList]
    temp[index] = !temp[index]
    for (let i = 0; i < temp.length; i++) {
      temp[i] = i === index ? temp[i] : false
    }

    setActivatedList(temp)
    onMenuTitleClick && onMenuTitleClick(e, index, temp.includes(true))

    context?.hideFilter()
  }

  useImperativeHandle(ref, () => ({
    hide: () => {
      setActivatedList([])
    },
  }))

  const renderMenuTitle = (newChild) =>
    React.Children.map(newChild, (child) => {
      if (React.isValidElement(child)) {
        const {
          title,
          options,
          value,
          icon,
          disabled,
          activeIndex,
          onTitleClick,
        } = child.props as any

        const selected = options?.filter((item) => item.value === value)

        const getTitle = () => {
          if (title) return title
          if (menuItemTitle[activeIndex]) {
            return menuItemTitle[activeIndex]
          }
          return selected?.[0]?.text
        }

        return (
          <View
            className={cx('hui-filter-menu-item', {
              active: activatedList[activeIndex],
              disabled,
            })}
            onClick={(e) => {
              if (onTitleClick) {
                onTitleClick()
                context?.hideMenu()
              } else {
                toggleMenuItem(activeIndex, disabled, e)
              }
            }}
          >
            <View className='hui-filter-menu-item-text'>{getTitle()}</View>
            {icon || (
              <View className='hui-filter-menu-item-icon'>
                <HuiIcon name='h110-upwards' size={14} />
              </View>
            )}
          </View>
        )
      }
      return null
    })

  const renderMenuItem = useCallback(
    (newChild) => {
      const updateMenuItemTitle = (index: number, text: string) => {
        const temp = [...menuItemTitle]
        temp[index] = text
        setMenuItemTitle(temp)
      }

      const hideMenuItem = (index: number) => {
        const temp = [...activatedList]
        temp[index] = false
        setActivatedList(temp)
      }
      return React.Children.map(newChild, (child) => {
        const { activeIndex } = child.props
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            parent: {
              index: activeIndex,
              show: activatedList[activeIndex],
              holdOpen,
              menuRef,
              hideMenuItem,
              updateMenuItemTitle,
              menuOnChange,
              offsetLeft: context?.offsetLeft,
            },
          } as any)
        }
        return null
      })
    },
    [menuItemTitle, activatedList, menuRef, menuOnChange],
  )

  return (
    <View {...rest} className={cx('hui-filter-menu', className)} ref={menuRef}>
      {menuItems?.map((item, index) => {
        const { needMenu = true, ...other } = item
        const itemInfo = { ...other, activeIndex: index }

        return (
          <Fragment key={index}>
            <View className='hui-filter-menu-container'>
              {renderMenuTitle(<Menu.Item {...itemInfo} />)}
            </View>
            {needMenu ? renderMenuItem(<Menu.Item {...itemInfo} />) : null}
          </Fragment>
        )
      })}
    </View>
  )
})

InternalMenu.defaultProps = defaultProps

type CompoundedComponent = React.ForwardRefExoticComponent<
  MenuProps & React.RefAttributes<MenuRef>
> & {
  Item: typeof MenuItem
}

const Menu = InternalMenu as CompoundedComponent

Menu.Item = MenuItem

export default Menu
