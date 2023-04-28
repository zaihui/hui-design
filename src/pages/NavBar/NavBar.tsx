import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'
import DemoNavBar from '@/demoComponents/DemoNavBar'
import router from '@/router'

import './NavBar.scss'

const NavBarDemo: React.FC = () => (
  <View className='nav-bar-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-08-05/hui-design-navbar-21080501.png'
      title='顶部导航NavBar'
      desc='顶部应用栏显示与当前页面相关的信息和操作'
    />
    <View className='content'>
      <GroupSection
        title='Tab类型'
        titleStyle={{ paddingLeft: Taro.pxTransform(16), paddingRight: Taro.pxTransform(16) }}
      >
        <SubGroupSection title='透明底导航'>
          <View
            className='row'
            onClick={() => router.NavBarWhiteDetail.navigateTo({
              hideBack: false,
              transparent: true,
              backgroundUrl: 'https://r.kezaihui.com/client/2021-08-05/176961628141405_.pic.jpg',
              title: '标题',
              theme: 'white',
            })}
          >
            <DemoNavBar
              transparent
              title='标题'
              theme='white'
              hideBack={false}
              extra={{ background: 'https://r.kezaihui.com/client/2021-08-05/nav-bar-bg-1-21080501.png' }}
            />
          </View>
          <View
            className='row'
            onClick={() => router.NavBarBlackDetail.navigateTo({
              hideBack: false,
              transparent: true,
              backgroundUrl: 'https://r.kezaihui.com/client/2021-08-05/176971628141406_.pic.jpg',
              title: '标题',
              theme: 'black',
            })}
          >
            <DemoNavBar
              transparent
              title='标题'
              theme='black'
              hideBack={false}
              extra={{ background: 'https://r.kezaihui.com/client/2021-08-05/nav-bar-bg-2-21080501.png' }}
            />
          </View>
        </SubGroupSection>
        <SubGroupSection title='有底色导航'>
          <View
            className='row'
            onClick={() => router.NavBarWhiteDetail.navigateTo({
              hideBack: false,
              title: '标题',
              theme: 'white',
            })}
          >
            <DemoNavBar
              title='标题'
              theme='white'
              hideBack={false}
            />
          </View>
          <View
            className='row'
            onClick={() => router.NavBarBlackDetail.navigateTo({
              hideBack: false,
              title: '标题',
              theme: 'black',
            })}
          >
            <DemoNavBar
              title='标题'
              theme='black'
              hideBack={false}
            />
          </View>
        </SubGroupSection>
      </GroupSection>
      <GroupSection
        title='有标题Tab的多种样式'
        titleStyle={{ paddingLeft: Taro.pxTransform(16), paddingRight: Taro.pxTransform(16) }}
      >
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: true,
            title: '标题',
            theme: 'white',
          })}
        >
          <DemoNavBar
            title='标题'
            theme='white'
            hideBack
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: false,
            title: '标题',
            theme: 'white',
          })}
        >
          <DemoNavBar
            title='标题'
            theme='white'
            hideBack={false}
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: false,
            title: '标题',
            customButton: true,
            theme: 'white',
          })}
        >
          <DemoNavBar
            title='标题'
            theme='white'
            hideBack={false}
            button={<View className='fake-button'><View className='fake-square'></View>按钮文案</View>}
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: false,
            showHome: true,
            title: '标题',
            theme: 'white',
          })}
        >
          <DemoNavBar
            showHome
            title='标题'
            theme='white'
            hideBack={false}
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: true,
            showHome: true,
            title: '标题',
            theme: 'white',
          })}
        >
          <DemoNavBar
            showHome
            hideBack
            title='标题'
            theme='white'
          />
        </View>
      </GroupSection>
      <GroupSection
        title='无标题Tab的多种样式'
        titleStyle={{ paddingLeft: Taro.pxTransform(16), paddingRight: Taro.pxTransform(16) }}
      >
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: true,
            theme: 'white',
          })}
        >
          <DemoNavBar
            theme='white'
            hideBack
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: false,
            theme: 'white',
          })}
        >
          <DemoNavBar
            theme='white'
            hideBack={false}
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: false,
            customButton: true,
          })}
        >
          <DemoNavBar
            theme='white'
            hideBack={false}
            button={<View className='fake-button'><View className='fake-square'></View>按钮文案</View>}
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: false,
            showHome: true,
            theme: 'white',
          })}
        >
          <DemoNavBar
            showHome
            theme='white'
            hideBack={false}
          />
        </View>
        <View
          className='row'
          onClick={() => router.NavBarWhiteDetail.navigateTo({
            hideBack: true,
            showHome: true,
            theme: 'white',
          })}
        >
          <DemoNavBar
            showHome
            hideBack
            theme='white'
          />
        </View>
      </GroupSection>
    </View>
  </View>
)

export default NavBarDemo
