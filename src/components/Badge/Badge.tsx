import React from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { formatValue } from '../../utils'

export interface HuiBadgeProps {
  /** 当数值为0时，是否展示Badge, 默认不展示 */
  showZero?: boolean
  /** 是否有红点, 默认无 */
  dot?: boolean
  /** 徽标类型: 实心(默认)、空心 */
  type?: 'default' | 'hollow'
  /** 徽标的值, 对应数字、文字类型 */
  value?: number | string
  /** 徽标为数字时的最大值, 默认999 */
  maxValue?: number
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

const HuiBadge: React.FC<HuiBadgeProps> = props => {
  const {
    showZero = false,
    dot = false,
    type = 'default',
    value = '',
    maxValue = 999,
    children,
    className = '',
    style,
  } = props
  const val = formatValue(value, maxValue)
  const isShow = !(val === '' || (+val === 0 && !showZero))
  const numCls = cx(
    'hui-badge-num',
    { smaller: typeof value === 'string' },
    { 'single-num': `${val}`.length === 1 },
  )

  return (
    <View
      style={style}
      className={cx(`hui-badge ${type} ${className}`, { fixed: !!children })}
    >
      {children}
      {dot ? (
        <View className='hui-badge-dot' />
      ) : (
        isShow && <View className={numCls}>{val}</View>
      )}
    </View>
  )
}

export default HuiBadge
