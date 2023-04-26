import React, { useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import HuiNavBar, { getOpacityChangeHandlerGenerator } from '@/components/NavBar'
import HuiButton from '@/components/Button/Button'

import './NavBarBlackDetail.scss'

const NavBarBlackDetail: React.FC = () => {
  const { q = '{}' } = useRouter().params
  const {
    theme = 'black',
    showHome = false,
    hideBack = false,
    customButton = false,
    transparent = false,
    homepagePath,
    backgroundUrl,
    title,
  } = JSON.parse(decodeURIComponent(q))

  const [navBarOpacity, setNavBarOpacity] = useState(0)
  const noCapsule = (!showHome && hideBack) || customButton

  const background = backgroundUrl
    ? `url(${backgroundUrl})`
    : undefined

  return (
    <View className='nav-bar-black-detail-page' style={{ backgroundImage: background }}>
      <HuiNavBar
        title={title}
        theme={theme}
        hideBack={hideBack}
        showHome={showHome}
        homepagePath={homepagePath}
        button={customButton ? <HuiButton size='small'>自定义按钮</HuiButton> : undefined}
        transparent={transparent}
        opacity={navBarOpacity}
      />
      <ScrollView
        enhanced
        scrollY
        scrollWithAnimation
        style={{ height: '100vh' }}
        onScroll={e => getOpacityChangeHandlerGenerator(e, opacity => setNavBarOpacity(opacity))}
      >
        <View className='custom-content'>
          {noCapsule && (
            <View className='special-button'>
              <HuiButton block onClick={() => Taro.navigateBack()}>返回</HuiButton>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default NavBarBlackDetail
