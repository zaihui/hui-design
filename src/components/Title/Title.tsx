import React from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'
import { HIconType } from '../Icon/type'
import HuiIcon from '../Icon'

import './Title.scss'

export enum TitleSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface HuiTitleProps {
  className?: string
  title?: React.ReactNode
  size?: TitleSize
  link?: React.ReactNode
  linkLeftIcon?: HIconType
  linkRightIcon?: HIconType
  onLinkClick?: () => void
}
const prefix = 'hui-title'
const HuiTitle: React.FC<HuiTitleProps> = (props) => {
  const {
    className,
    title,
    size = TitleSize.Medium,
    link,
    linkLeftIcon,
    linkRightIcon,
    onLinkClick,
  } = props
  return (
    <View className={cx(prefix, className, size)}>
      <View className='title'>{title}</View>
      <View className='link' onClick={onLinkClick}>
        {linkLeftIcon && <HuiIcon className='link-left-icon' name={linkLeftIcon} />}
        {link}
        {linkRightIcon && <HuiIcon className='link-right-icon' name={linkRightIcon} />}
      </View>
    </View>
  )
}

export default HuiTitle
