import React, { forwardRef, FunctionComponent } from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

const MAX_COLUMN_NUM = 5

export interface HuiGridProps extends ViewProps {
  /**
   *  列数，最大只能设为5，默认为5
   *  若总grid-item总数不足列数时，则会将多余空间等比均分给子项目
   * */
  columnNum?: number
  style?: React.CSSProperties
  className?: string
}

const HuiGrid: React.ForwardRefRenderFunction<ViewProps, HuiGridProps> = (props, ref) => {
  const { columnNum = 5, children, style, className = '', ...rest } = props

  const itemSize = React.Children.count(children)

  return (
    <View
      className={cx(
        'hui-grid',
        `${className}`,
        { 'layout-evenly': itemSize < Math.min(columnNum, MAX_COLUMN_NUM) },
        { [`layout-column-${Math.min(columnNum, MAX_COLUMN_NUM)}`]: itemSize >= Math.min(columnNum, MAX_COLUMN_NUM) },
      )}
      ref={ref}
      style={style}
      {...rest}
    >
      {children}
    </View>
  )
}

export default forwardRef(HuiGrid) as FunctionComponent
