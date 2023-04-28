import { View, Image, Block } from '@tarojs/components'
import classname from 'classnames'
import React from 'react'

const LOADER_URL = 'https://r.kezaihui.com/loading-storehome-20191120001.gif'

export interface HuiLoaderProps {
  className?: string
  style?: React.CSSProperties
  /** 是否展示loader */
  loading?: boolean
  /** 对应于设计稿中的 页面加载loading | 下拉加载loading | 局部模块loading */
  type?: 'page' | 'bottom' | 'module'
  /** 加载文案 默认为：加载中… */
  tip?: React.ReactNode
  /** 触底加载是否已经完成 */
  reachedBottom?: boolean
  /** 触底加载完成文案 */
  reachedBottomText?: React.ReactNode
  children?: React.ReactNode
  onClick?(e): void
}
const prefix = 'hui-loader'
const Loader: React.FC<HuiLoaderProps> = props => {
  const {
    className = '',
    loading = false,
    style,
    tip = '加载中…',
    type = 'page',
    reachedBottom = false,
    reachedBottomText = '- 到底啦 -',
    onClick,
    children,
  } = props
  const child = children
  const loadingClassName = classname(prefix, className, {
    'loader-page': type === 'page',
    'loader-bottom': type === 'bottom',
    'loader-module': type === 'module',
  })

  const loadingElement = (
    <View className={loadingClassName} style={style} onClick={onClick}>
      {type !== 'bottom' && <View className={`${prefix}-padding`} />}
      {type !== 'bottom' && <Image src={LOADER_URL} className={`${prefix}-image`}></Image>}
      <View className={`${prefix}-tip`}>{tip}</View>
    </View>
  )

  const bottomContent = !reachedBottom ? null : (
    <View className={loadingClassName} style={style} onClick={onClick}>
      <View className={`${prefix}-tip`}>{reachedBottomText}</View>
    </View>
  )

  if (type === 'bottom') {
    return (
      <Block>
        {child}
        {loading ? loadingElement : bottomContent}
      </Block>
    )
  }

  return loading ? loadingElement : child as React.ReactElement
}

export default Loader
