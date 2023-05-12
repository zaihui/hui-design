import { View } from '@tarojs/components'
import Taro, { usePageScroll } from '@tarojs/taro'
import cx from 'classnames'
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useBoundingClientRect } from '@shared/utils/src/hooks'
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
    fixed = false,
    sticky = false,
    ...rest
  } = { ...defaultProps, ...props }
  const [isFixed, setIsFixed] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [filterTop, setFilterTop] = useState<number>(0)

  const filterRef = useRef()
  const menuRef = useRef<any>()

  const contextValue = useMemo(
    () => ({
      isFixed,
      filterTop,
      hideFilter: () => setVisible(false),
      hideMenu: () => {
        menuRef.current && menuRef.current.hide()
      },
    }),
    [menuRef, filterTop],
  )

  const info = useBoundingClientRect(filterRef)

  usePageScroll((res) => {
    getCurrentRef()
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
      parent: {
        filterRef,
        filterTop,
        isFixed: fixed,
      },
      visible,
      onClose: () => setVisible(false),
    }),
    [filtersContentConfig, fixed, visible, filterTop],
  )

  const handleFilter = () => {
    contextValue.hideMenu()
    setVisible(!visible)
  }

  useEffect(() => getCurrentRef(), [])

  const getCurrentRef = () => {
    Taro.nextTick(() => {
      if (filterRef.current) {
        const query = Taro.createSelectorQuery()
        if (!(filterRef?.current as any)?.className) {
          throw new Error(
            'createSelectorQuery 传入的Taro.TaroElement对象需要有className',
          )
        }
        const refClassName = (filterRef.current as any)?.className?.replace(
          / /g,
          '.',
        )
        // eslint-disable-next-line no-unused-expressions
        query
          .select(`.${refClassName}`)
          ?.boundingClientRect((rect) => {
            if (rect) {
              const { height, top } = rect
              setFilterTop(height + top)
            }
          })
          .exec()
      }
    })
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
          >
            {menuItems?.map((item, index) => (
              <Menu.Item {...item} key={index} />
            ))}
          </Menu>
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
