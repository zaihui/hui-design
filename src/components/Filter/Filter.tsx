import { View } from '@tarojs/components'
import { usePageScroll } from '@tarojs/taro'
import cx from 'classnames'
import React, {
  CSSProperties,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useBoundingClientRect } from '../../utils/hooks'
import HuiIcon from '../Icon'
import FiltersContent, { FiltersContentProps } from './FiltersContent'
import Menu, { MenuProps } from './Menu/Menu'
import { MenuItemProps } from './MenuItem/MenuItem'
import FilterContext from './context'
import HuiSticky from '../Sticky/Sticky'
import { generateUniqueId } from './utils'

interface MenuConfig extends MenuProps {
  menuItems: MenuItemProps[]
}

export interface HuiFilterProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** 滚动时是否固定在顶部 */
  fixed?: boolean
  menuConfig?: MenuConfig
  filtersContentConfig?: Omit<FiltersContentProps, 'visible'>
  sticky?: boolean
}

const defaultProps = {
  className: '',
  style: {},
  type: 'menu',
  filterType: 'single',
}

const HuiFilter: React.FC<HuiFilterProps> = (props) => {
  const {
    className = '',
    menuConfig,
    children,
    filtersContentConfig,
    // eslint-disable-next-line
    fixed = false, // 组件内没有用到，但是小程序内都穿了，不能删
    sticky = false,
    ...rest
  } = { ...defaultProps, ...props }
  const [isFixed, setIsFixed] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)

  const filterRef = useRef()
  const menuRef = useRef<any>()

  const contextValue = useMemo(
    () => ({
      isFixed,
      hideFilter: () => setVisible(false),
      hideMenu: () => {
        menuRef.current && menuRef.current.hide()
      },
    }),
    [menuRef, isFixed],
  )

  const info = useBoundingClientRect(filterRef)

  usePageScroll((res) => {
    if (!info || !res) return
    if (res.scrollTop >= info.top) {
      setIsFixed(true)
    } else {
      setIsFixed(false)
    }
  })

  const { isMenu, menuProps, menuItems } = useMemo(() => {
    const { menuItems: menuItemProps, ...restProps } = menuConfig || {}
    return {
      isMenu: !!menuConfig,
      menuItems: menuItemProps,
      menuProps: restProps,
    }
  }, [menuConfig])

  const filterProps = useMemo(
    () => ({
      ...(filtersContentConfig || {}),
      visible,
      onClose: () => setVisible(false),
    }),
    [filtersContentConfig, visible],
  )

  const handleFilter = () => {
    contextValue.hideMenu()
    setVisible(!visible)
  }

  const render = () => (
    <View
      {...rest}
      ref={filterRef}
      className={cx('hui-filter', className, generateUniqueId())}
    >
      <FilterContext.Provider value={contextValue}>
        {isMenu ? (
          <Menu
            {...menuProps}
            className='hui-filter-left-content'
            ref={menuRef}
            menuItems={menuItems}
          ></Menu>
        ) : (
          <View className='hui-filter-left-content custom'>{children}</View>
        )}

        {filtersContentConfig && (
          <View className='hui-filter-right-content'>
            <View
              className='hui-filter-right-content-icon'
              onClick={handleFilter}
            >
              <HuiIcon name='h109-filter' size={14} />
              <View>筛选</View>
            </View>
            <FiltersContent {...filterProps} />
          </View>
        )}
      </FilterContext.Provider>
    </View>
  )

  return sticky ? <HuiSticky>{render()}</HuiSticky> : render()
}

export default HuiFilter
