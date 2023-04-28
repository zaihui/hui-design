import Taro from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { View } from '@tarojs/components'

import { useBoundingClientRect } from '../../utils/hooks'

export interface HuiStickyProps {
  /** 吸顶时与顶部的距离，单位px */
  offsetTop?: number
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const HuiSticky: React.FC<HuiStickyProps> = props => {
  const { offsetTop = 0, children, className = '', style } = props

  const contentRef = useRef()
  const containerRef = useRef<{ uid: string }>()
  const contentClientRect = useBoundingClientRect(contentRef)
  const [contentFixed, setContentFixed] = useState(false)

  useEffect(() => {
    const height = contentClientRect?.height || 0
    const pages = Taro.getCurrentPages()
    const observer = Taro.createIntersectionObserver(pages[pages.length - 1], {
      thresholds: [0.1, 1],
      initialRatio: 1,
    })
    observer
      .relativeToViewport({ top: -offsetTop - (contentFixed ? height : 0) })
      .observe(`#${containerRef.current?.uid}`, res => {
        if (res.boundingClientRect.top < offsetTop) {
          setContentFixed(true)
        } else {
          setContentFixed(false)
        }
      })
    return () => {
      observer.disconnect()
    }
  }, [contentClientRect, offsetTop, contentFixed])

  return (
    <View
      className={cx(`hui-sticky-container ${className}`, { fixed: contentFixed })}
      style={{ height: contentFixed ? contentClientRect?.height : 'unset', ...style }}
      ref={containerRef}
    >
      <View
        className='hui-sticky-content'
        ref={contentRef}
        style={{ top: offsetTop }}
      >
        {children}
      </View>
    </View>
  )
}

export default HuiSticky
