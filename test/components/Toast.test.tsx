import React from 'react'
import Taro from '@tarojs/taro'
import HuiToast from '@/components/Toast/Toast'
import { renderToString } from 'nerv-server'

// 组件里使用了Taro.pxTransform()的话需要在执行测试文件前先调Taro.initPxTransform()
// 因为测试文件是直接引入的组件文件 没有进行编译 所以直接执行测试文件会报错
Taro.initPxTransform({ designWidth: 375, deviceRatio: {} })

describe('huiIcon Snap', () => {
  it('renders HuiToast -- text', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiToast title='Hello' type='text' visible />,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiToast -- success', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiToast title='success' type='success' visible />,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiToast -- fail', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiToast title='fail' type='fail' visible />,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiToast -- custom', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiToast title='custom' type='custom' icon='001-close' visible />,
    )
    expect(component).toMatchSnapshot()
  })
})
