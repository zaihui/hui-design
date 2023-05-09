import React, { CSSProperties, ReactNode, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'
import Menu, { MenuProps } from './Menu/Menu'
import { MenuItemProps } from './MenuItem/MenuItem'
import FiltersContent, { FiltersContentProps } from './FiltersContent'
import HuiButton from '../Button/Button'

interface MenuConfig extends MenuProps {
  menuItems: MenuItemProps[]
}

export interface HuiFilterProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  menuConfig?: MenuConfig
  filtersContentConfig: Omit<FiltersContentProps, 'visible'>
  // TODO
  rightFilter?: boolean
  // TODO
  rightFilterOptions?: any
}

const defaultProps = {
  className: '',
  style: {},
  type: 'menu',
  filterType: 'single',
}

const HuiFilter: React.FC<HuiFilterProps> = props => {
  // TODO
  const {
    className,
    // rightFilter,
    // rightFilterOptions,
    menuConfig,
    children,
    filtersContentConfig,
    ...rest
  } = { ...defaultProps, ...props }
  const {
    filterItems = [{ label: '', name: '', value: '', children: '' }],
    ...restFiltersConfig
  } = filtersContentConfig

  const [visible, setVisible] = useState<boolean>(false)

  const { isMenu, menuProps, menuItems } = useMemo(() => {
    const { menuItems: menuItemProps, ...restProps } = menuConfig || {}
    return {
      isMenu: !!menuConfig,
      menuItems: menuItemProps,
      menuProps: restProps,
    }
  }, [menuConfig])

  return (
    <View {...rest} className={cx('hui-filter', className)}>
      {isMenu ? (
        <Menu {...menuProps}>
          {menuItems?.map((item, index) => (
            <Menu.Item {...item} key={index} />
          ))}
        </Menu>
      ) : (
        <View>{children}</View>
      )}
      {/*   TODO */}
      <HuiButton onClick={() => setVisible(!visible)}>测试一下</HuiButton>
      <FiltersContent
        visible={visible}
        filterItems={filterItems}
        {...restFiltersConfig}
      />
    </View>
  )
}

export default HuiFilter
