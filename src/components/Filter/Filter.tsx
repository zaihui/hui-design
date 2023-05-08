import React, { CSSProperties, ReactNode, useMemo } from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'
import Menu, { MenuProps } from './Menu/Menu'
import { MenuItemProps } from './MenuItem/MenuItem'

interface MenuConfig extends MenuProps {
  menuItems: MenuItemProps[]
}

export interface HuiFilterProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  menuConfig?: MenuConfig
  // TODO
  rightFilter?: boolean
  // TODO
  rightFilterOptions?: any
}

const defaultProps = {
  className: '',
  style: {},
  type: 'menu',
}

const HuiFilter: React.FC<HuiFilterProps> = props => {
  // TODO
  const {
    className,
    // rightFilter,
    // rightFilterOptions,
    menuConfig,
    children,
    ...rest
  } = { ...defaultProps, ...props }

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
    </View>
  )
}

export default HuiFilter
