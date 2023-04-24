import React from 'react'
import { Swiper, SwiperItem, View } from '@tarojs/components'

import HuiSwiperIndicator from '@/components/SwiperIndicator'

const DemoPage: React.FC = () => (
  // #region demo
  <View className='icon-sample'>
    <View className='sample-nav'>SwiperIndicator Swiper指示器组件</View>

    <View className='sample-title'>基本用法</View>
    <HuiSwiperIndicator style={{ bottom: 10 }}>
      <Swiper>
        <SwiperItem>
          <View
            style={{
              background: '#1AAD19',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            A
          </View>
        </SwiperItem>
        <SwiperItem>
          <View
            style={{
              background: '#2782D7',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            B
          </View>
        </SwiperItem>
        <SwiperItem>
          <View
            style={{
              background: '#F1F1F1',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            C
          </View>
        </SwiperItem>
      </Swiper>
    </HuiSwiperIndicator>
    <View className='sample-title'>控制位置</View>
    <View style={{ width: '50vw' }}>
      <HuiSwiperIndicator style={{ bottom: -16 }} activeColor='#1AAD19'>
        <Swiper>
          <SwiperItem>
            <View
              style={{
                background: '#1AAD19',
                textAlign: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              A
            </View>
          </SwiperItem>
          <SwiperItem>
            <View
              style={{
                background: '#2782D7',
                textAlign: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              B
            </View>
          </SwiperItem>
          <SwiperItem>
            <View
              style={{
                background: '#F1F1F1',
                textAlign: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              C
            </View>
          </SwiperItem>
        </Swiper>
      </HuiSwiperIndicator>
    </View>
  </View>
)
// #endregion demo

export default DemoPage
