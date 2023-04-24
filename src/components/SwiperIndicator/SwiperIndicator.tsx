import React, { useState } from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'

export interface HuiSwiperIndicatorProps {
  /** 当前对应的圆点的颜色 */
  activeColor?: string
  /** 自定义圆点指示器的样式 */
  style?: React.CSSProperties
  children: React.ReactElement
  className?: string
}

const HuiSwiperIndicator: React.FC<HuiSwiperIndicatorProps> = props => {
  const { activeColor, style, children, className = '' } = props
  const [current, setCurrent] = useState<number>(0)

  const originOnChange = children.props.onChange
  children.props.onChange = e => {
    setCurrent(e.detail.current)
    originOnChange && originOnChange(e)
  }

  const swiperItemCount = children.props.children?.length
  return (
    <View className={`hui-swiper-indicator ${className}`}>
      {children}
      <View className='hui-swiper-indicator-wrapper' style={style}>
        {Array.from(Array(swiperItemCount), (_, index) =>
        <View key={index} className={cx('hui-swiper-indicator-item', { active: current === index })} style={{
          background: current === index ? activeColor : '',
        }}
        ></View>)}
      </View>
    </View>
  )
}

export default HuiSwiperIndicator
