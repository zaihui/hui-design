import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { View, Image } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'

import HuiButton, { HuiButtonProps } from '../Button/Button'
import noData from '../../static/nodata.png'
import noSearch from '../../static/nosearch.png'
import failed from '../../static/failed.png'

export interface HuiDefaultPageProps {
  className?: string
  /** 是否显示缺省页 */
  visible?: boolean
  /** 缺省页类型： noData | noSearch | failed */
  type?: 'noData' | 'noSearch' | 'failed'
  /** 图标or图片元素 */
  imageIcon?: React.ReactElement
  /** 主描述文案 */
  description?: React.ReactNode
  /** 副描述文案 */
  info?: React.ReactNode
  /** 是否展示按钮 */
  showButton?: boolean
  /** 按钮的点击事件 */
  onClick?: (e: ITouchEvent) => void
  /** 按钮上的文案 */
  buttonText?: string
  /** 按钮属性, 这里声明的属性会覆盖默认属性以及外层的属性 */
  buttonProps?: HuiButtonProps
  style?: React.CSSProperties
  children?: React.ReactNode
}
type ContentProps = HuiDefaultPageProps & { isImage?: boolean }
const prefix = 'hui-default-page'
const defaultContent: ContentProps = {
  showButton: true,
  isImage: true,
  description: '暂无数据',
  info: '',
  buttonText: '看看其他',
  imageIcon: noData,
}

const DefaultPage: React.FC<HuiDefaultPageProps> = props => {
  const {
    className = '',
    type,
    visible = false,
    imageIcon,
    buttonProps,
    children,
    style,
    onClick,
  } = props
  const [content, setContent] = useState<ContentProps>(defaultContent)
  useEffect(() => {
    if (!type) {
      setContent({ ...props })
      return
    }
    switch (type) {
      case 'noData':
        setContent(defaultContent)
        break
      case 'noSearch':
        setContent({
          showButton: false,
          isImage: true,
          description: '找了一圈，啥也没找到',
          info: '',
          imageIcon: noSearch,
        })
        break
      case 'failed':
        setContent({
          showButton: true,
          isImage: true,
          description: '加载失败',
          info: '重新再试一下吧',
          imageIcon: failed,
          buttonText: '重新加载',
        })
        break
      default:
        setContent(defaultContent)
        break
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const btnProps: HuiButtonProps = {
    type: 'primary',
    size: 'medium',
    onClick,
    ...buttonProps,
  }

  const defaultPage = (
    <View className={cx(prefix, className)} style={style}>
      <View className={`${prefix}-padding`} />
      {content.imageIcon && (
        <View className={`${prefix}-image`}>
          {content.isImage
            ? (<Image src={content.imageIcon as never} className={`${prefix}-image-pic`} />)
            : imageIcon}
        </View>
      )}
      {content.description && <View className={`${prefix}-description`}>{content.description}</View>}
      {content.info && <View className={`${prefix}-info`}>{content.info}</View>}
      {content.showButton && props.showButton && (
        <View className={`${prefix}-btn`}>
          <HuiButton {...btnProps}>
            {content.buttonText}
          </HuiButton>
        </View>
      )}
    </View>
  )
  const childs = children ?? null

  return visible ? defaultPage : childs as React.ReactElement
}

DefaultPage.defaultProps = {
  visible: false,
  showButton: true,
  buttonText: '确认',
}

export default DefaultPage
