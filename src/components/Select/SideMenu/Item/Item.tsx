import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import cx from 'classnames'
import React from 'react'

export interface HuiSideMenuItemProps extends ViewProps {
  /** 菜单文字 */
  label?: string
  /** 菜单的值，应当唯一 */
  value?: number | string
  // 以下为SideMenu传的属性
  active?: number | string
  indicatorColor?: string
  onChange?(v?: number | string): void
}

const Item: React.FC<HuiSideMenuItemProps> = props => {
  const { label, value, children, active, indicatorColor, onChange } = props

  return (
    <View
      className={cx('hui-select-side-menu-item', { active: active === value })}
      style={{ color: indicatorColor }}
      onClick={() => onChange && onChange(value)}
    >
      {label || children}
    </View>
  )
}

export default Item
