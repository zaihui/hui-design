import React, { useEffect } from 'react'
import { View } from '@tarojs/components'

export interface HuiTabProps {
  /** 标签的标题 */
  title: string
  /** 微笑样式下的副标题 */
  subTitle?: string
  /** 标签的名称，作为匹配的标识符 */
  name?: string
  // 以下为Tabs传的属性
  animated?: boolean
  active?: number | string
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  updateParent?: (v) => void
}

const defaultProps = {
  updateParent: () => undefined,
}

const HuiTab: React.FC<HuiTabProps> = props => {
  const {
    title,
    subTitle,
    animated,
    active,
    updateParent = defaultProps.updateParent,
    name,
    style,
    className = '',
    children,
  } = props

  useEffect(() => {
    updateParent({ title, subTitle, name })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, subTitle])

  return (
    <View
      className={`hui-tab ${className}`}
      style={{ display: (!animated && active !== name) ? 'none' : 'block', ...style }}
    >
      {children}
    </View>
  )
}

export default HuiTab
