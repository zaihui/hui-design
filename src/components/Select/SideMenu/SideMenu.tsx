import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import React from 'react'

import Item from './Item/Item'

export interface HuiSideMenuProps extends ViewProps {
  /** 当前选中项 */
  active: string | number
  /** 指示器颜色 */
  indicatorColor?: string
  /** 切换回调 */
  onChange?(v: number | string): void
}

const SideMenu: React.FC<HuiSideMenuProps> = props => {
  const { active, indicatorColor, onChange, children, ...rest } = props

  const getChildren = () => {
    const fn = (child, index) =>
      React.cloneElement(child, {
        value: child.props.value || index,
        onChange: (v: number | string) => onChange && onChange(v),
        active,
        indicatorColor,
      })
    return (children && React.Children.map(children, fn)) || null
  }

  return (
    <View
      className='hui-select-side-menu'
      {...rest}
    >
      {getChildren()}
    </View>
  )
}

interface ISideMenu extends React.FC<HuiSideMenuProps> {
  Item: typeof Item
}
const HuiSideMenu = SideMenu as ISideMenu
HuiSideMenu.Item = Item
export default HuiSideMenu
