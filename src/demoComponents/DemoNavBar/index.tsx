import React from 'react'
import Taro from '@tarojs/taro'
import { BaseEventOrig, View, Image } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import cx from 'classnames'

import { addOpacityToHexColor, pxTransform } from '../../utils'
import HuiIcon from '../../components/Icon'

import './style.scss'

const BLACK_THEME_CAPSULE_IMG = 'https://r.kezaihui.com/client/2021-08-06/wechat-capsule-black-21080601.png'
const WHITE_THEME_CAPSULE_IMG = 'https://r.kezaihui.com/client/2021-08-06/wechat-capsule-white-21080602.png'
const DEFAULT_ICON_SIZE = 18
const DEFAULT_HOME_PAGE_PATH = '/pages/Index/Index'

enum ThemeColor {
  Black = '#000000',
  White = '#ffffff',
}

interface HuiNavBarProps {
  /**
   * 是否为透明背景，使用透明背景时需要配合ScrollView的onScroll事件来改变透明度，
   * onScroll事件用getOpacityChangeHandlerGenerator生成
   * */
  transparent?: boolean
  /** 标题 */
  title?: string
  /** 主题色，需要和页面配置的navigationBarTextStyle保持一致 */
  theme?: 'white' | 'black'
  /** 是否隐藏返回上一页按钮 */
  hideBack?: boolean
  /** 是否展示回首页按钮 */
  showHome?: boolean
  button?: React.ReactNode
  opacity?: number
  extra?: {
    background?: string
  }
  /** 首页地址，默认为/pages/Index/Index */
  homepagePath?: string
  /** 返回上一页的钩子函数，返回false或者Promise.resolve(false)跳转首页失败 */
  beforeNavBack?: () => boolean | Promise<boolean>
  /** 返回首页前的钩子函数，返回false或者Promise.resolve(false)跳转首页失败 */
  beforeBackToHome?: () => boolean | Promise<boolean>
}
const HuiNavBar: React.FC<HuiNavBarProps> = props => {
  const {
    transparent,
    title,
    hideBack,
    showHome,
    button,
    opacity,
    theme,
    extra,
    homepagePath = DEFAULT_HOME_PAGE_PATH,
    beforeNavBack,
    beforeBackToHome,
  } = props

  const showBack = !hideBack
  const showCapsule = !button && (showBack || showHome)
  const showBorder = showHome
  const { height } = Taro.getMenuButtonBoundingClientRect()

  const handleBackToHome = async () => {
    const canBackToHome = typeof beforeBackToHome === 'function'
      ? await beforeBackToHome()
      : true

    if (!canBackToHome) {
      return
    }

    Taro.reLaunch({
      url: homepagePath,
    })
  }

  const handleBack = async () => {
    const canBack = typeof beforeNavBack === 'function'
      ? await beforeNavBack()
      : true

    if (!canBack) {
      return
    }

    Taro.navigateBack()
  }

  const backgroundColor = theme === 'black' ? ThemeColor.Black : ThemeColor.White
  const fontColor = theme === 'black' ? ThemeColor.White : ThemeColor.Black

  const getBackgroundColor = () => {
    if (!transparent) {
      return backgroundColor
    }

    if (extra?.background) {
      return undefined
    }

    return addOpacityToHexColor(backgroundColor, opacity)
  }

  return (
    <View
      className={cx('demo-hui-nav-bar', { transparent })}
      style={{
        backgroundColor: getBackgroundColor(),
        backgroundImage: extra?.background ? `url(${extra?.background})` : undefined,
      }}
    >
      <View className='hui-nav-bar-content' style={{ height: pxTransform(height) }}>
        {!!button && <View className='hui-nav-bar-custom-button'>{button}</View>}
        {showCapsule && (
          <View className={cx('hui-nav-bar-capsule', { 'with-border': showBorder })} style={{ color: fontColor }}>
            {showBack && (
              <View className='hui-nav-bar-back' onClick={handleBack}>
                <HuiIcon name='011-left' size={DEFAULT_ICON_SIZE} />
              </View>
            )}
            {(showBack && showHome) && <View className='hui-nav-bar-divider' />}
            {showHome && (
              <View className='hui-nav-bar-back-home' onClick={handleBackToHome}>
                <HuiIcon name='078-homefill' size={DEFAULT_ICON_SIZE} color={fontColor} />
              </View>
            )}
          </View>
        )}
        {title && (
          <View
            className='hui-nav-bar-title'
            style={{ color: fontColor }}
          >
            {title}
          </View>
        )}
        <View className='fake-right-capsule'>
          <Image
            style={{ width: Taro.pxTransform(87), height: Taro.pxTransform(32) }}
            src={theme === 'black' ? BLACK_THEME_CAPSULE_IMG : WHITE_THEME_CAPSULE_IMG}
          />
        </View>
      </View>
    </View>
  )
}

const OPACITY_CHANGE_SCROLL_UPPER = 100
const OPACITY_CHANGE_SCROLL_RANGE = 60

export const getOpacityChangeHandlerGenerator = (
  e: BaseEventOrig<ScrollViewProps.onScrollDetail>,
  cb: (opacity: number) => void,
): void => {
  let opacity = Math.max(e.detail.scrollTop - OPACITY_CHANGE_SCROLL_UPPER, 0)
    / OPACITY_CHANGE_SCROLL_RANGE

  if (opacity > 1) {
    opacity = 1
  } else {
    opacity = Number(opacity.toFixed(1))
  }

  cb(opacity)
}

HuiNavBar.defaultProps = {
  transparent: false,
  title: '',
  hideBack: false,
  showHome: false,
  button: null,
  opacity: 1,
  theme: 'black',
  homepagePath: DEFAULT_HOME_PAGE_PATH,
}

export default HuiNavBar
