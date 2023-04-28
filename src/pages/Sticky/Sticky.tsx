import React from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import HuiSticky from '@/components/Sticky/Sticky'

export default class StickySample extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    // #region demo
    return (
      <View className='icon-sample' style={{ height: '200vh' }}>
        <View className='sample-nav'>Sticky 吸顶布局</View>
        <View className='sample-title'>基本用法</View>
        <HuiSticky offsetTop={0}>
          <HuiButton type='primary'>基本用法</HuiButton>
        </HuiSticky>
        <View className='sample-gap' />
        <HuiSticky offsetTop={100}>
          <HuiButton type='primary' color='green'>
            吸顶距离为100px
          </HuiButton>
        </HuiSticky>
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        <View className='sample-divider' />
        文字文字文字文字文字文字文字文字文字文字文字文字文字文字
      </View>
    )
    // #endregion demo
  }
}
