import React, { useState } from 'react'
import { View, Image, BaseEventOrig } from '@tarojs/components'
import { ImageProps } from '@tarojs/components/types/Image'
import cx from 'classnames'
import { ImageStatus, ImageSize } from './constants'
import HuiIcon from '../Icon/Icon'
import { HIconType } from '../Icon/type'
import { pxTransform } from '../../utils'

const getIconName = (imageStatus: ImageStatus): HIconType | '' => {
  if (imageStatus === ImageStatus.Fail) {
    return '014-loadfailed'
  }

  if (imageStatus === ImageStatus.Empty) {
    return '122-defaultfill'
  }

  return ''
}

export interface HuiImageProps extends Omit<ImageProps, 'src'> {
  /** 图片地址 */
  src?: string
  /** 自定义加载占位图片 */
  placeholderImg?: string
  /** 自定义加载占位图标 */
  placeholderIcon?: HIconType
  /** 是否开启加载动画，默认false */
  animated?: boolean
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
  style?: React.CSSProperties
  wapperClassName?: string
}

const HuiImage: React.FC<HuiImageProps> = props => {
  const {
    style: customStyle,
    width = 0,
    height = 0,
    src,
    animated,
    placeholderImg,
    placeholderIcon,
    wapperClassName = '',
    onLoad,
    onError,
    ...rest
  } = props
  const [imageStatus, setImageStatus] = useState(src ? ImageStatus.Loading : ImageStatus.Empty)
  const defaultPlaceholderSize = width * 0.4
  const customPlaceholderSize = width * 0.16

  const iconName = getIconName(imageStatus)

  const handleOnLoad = (event: BaseEventOrig<ImageProps.onLoadEventDetail>) => {
    setImageStatus(ImageStatus.Success)
    onLoad && onLoad(event)
  }

  const handleOnError = (event: BaseEventOrig<ImageProps.onErrorEventDetail>) => {
    setImageStatus(ImageStatus.Fail)
    onError && onError(event)
  }

  const getImageStatusText = () => {
    if (imageStatus === ImageStatus.Empty) return '暂无图片'
    if (imageStatus === ImageStatus.Fail) return '加载失败'
    if (imageStatus === ImageStatus.Loading) return '加载中…'
    return ''
  }

  const getPlaceholder = () => {
    if (iconName) {
      return <HuiIcon name={iconName} size={defaultPlaceholderSize} />
    }
    if (placeholderIcon) {
      return <HuiIcon name={placeholderIcon} size={customPlaceholderSize} />
    }
    if (placeholderImg) {
      const placeholderImgSize = pxTransform(customPlaceholderSize)
      return <Image mode='aspectFill' src={placeholderImg} style={{ width: placeholderImgSize, height: placeholderImgSize }} />
    }
    return ''
  }

  /**
   * 当未传入width或height时，加载状态展示为色块+动画效果
   * 当图片宽或者高小于60px，加载状态仅展示为色块
   * 当图片宽或者高小于86px，加载状态仅展示为文字
   * 当图片宽和高都大于86px，加载状态展示为图文
   */
  const getImageSize = () => {
    if (height && width) {
      return width < 60 || height < 60
        ? ImageSize.SMALL : width < 86 || height < 86
          ? ImageSize.MEDIUM : ImageSize.LARGE
    }
    return ImageSize.SMALL
  }

  const imageSize = getImageSize()

  const showAnimation = animated || !height || !width

  const style = Object.assign(
    height && width ? { height: pxTransform(height), width: pxTransform(width) } : {},
    customStyle,
  )

  return (
    <View className={`hui-image ${wapperClassName}`} style={style}>
      {
        imageStatus !== ImageStatus.Success && (
          <View className={cx('placeholder', { 'shine': imageStatus === ImageStatus.Loading && showAnimation })}>
            {imageSize === ImageSize.LARGE ? getPlaceholder() : null}
            {imageSize === ImageSize.LARGE && imageStatus === ImageStatus.Loading && <View className='loading-text'>加载中…</View>}
            {imageSize === ImageSize.MEDIUM ? getImageStatusText() : null}
          </View>
        )
      }
      {
        src && (
          <Image
            src={src}
            className='image'
            onLoad={handleOnLoad}
            onError={handleOnError}
            {... rest}
          />
        )
      }
    </View>
  )
}

HuiImage.defaultProps = {
  animated: false,
  mode: 'aspectFit',
}

export default HuiImage
