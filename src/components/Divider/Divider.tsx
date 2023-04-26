/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'

import { pxTransform } from '../../utils'
import { DividerTypeProp } from './constants'

export interface HuiDividerProps {
  style?: React.CSSProperties
  /** 分割线类型: 水平、垂直；默认'horizontal' */
  type?: DividerTypeProp
  /** 分割线的左右margin */
  margin?: number
  /** 高度 */
  height?: number
  /** 使用0.5px分割线 */
  hairline?: boolean
  className?: string
}

const HuiDivider: React.FC<HuiDividerProps> = props => {
  const {
    type = 'horizontal',
    margin,
    height,
    hairline,
    className = '',
    style: newStyle,
  } = props

  const style = {
    margin: `0 ${margin && pxTransform(margin)}`,
    height: height && pxTransform(height),
    ...newStyle,
  }

  const dividerType = type === 'vertical'
    ? 'vertical'
    : 'horizontal'
  const hairlineClsName = `${dividerType}-hairline`

  return (
    <View
      className={
        cx(
          'hui-divider',
          `hui-divider-${dividerType}`,
          `${className}`,
          { [hairlineClsName]: hairline },
        )
      }
      style={style}
    ></View>
  )
}

HuiDivider.defaultProps = {
  type: 'horizontal',
  hairline: false,
}

export default HuiDivider
