import React from 'react'
import Taro from '@tarojs/taro'
import { findDOMNode } from 'nervjs'
import HuiIcon from '@/components/Icon/Icon'
import { renderToString } from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'

// 组件里使用了Taro.pxTransform()的话需要在执行测试文件前先调Taro.initPxTransform()
// 因为测试文件是直接引入的组件文件 没有进行编译 所以直接执行测试文件会报错
Taro.initPxTransform({ designWidth: 375, deviceRatio: {} })

describe('huiIcon Snap', () => {
  it('renders HuiIcon', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiIcon name='015-searchcircle'></HuiIcon>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiIcon -- color', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiIcon name='015-searchcircle'color='rgba(30, 30, 30)'></HuiIcon>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiIcon -- size', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiIcon name='015-searchcircle'color='rgba(30, 30, 30)' size={20}></HuiIcon>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiIcon -- customStyle', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiIcon
        name='015-searchcircle'
        style={{
          color: 'rgba(30, 30, 30)',
          display: 'inline-block',
        }}
      ></HuiIcon>,
    )
    expect(component).toMatchSnapshot()
  })
})

describe('huiIcon Event', () => {
  it('huiIcon onClick', () => {
    expect.hasAssertions()
    const onClick = jest.fn()
    const component = renderIntoDocument(
      <HuiIcon onClick={onClick} name='015-searchcircle' size={15}></HuiIcon>,
    )
    const componentDom = findDOMNode(component, 'hui-icon-015-searchcircle')
    Simulate.click(componentDom)
    expect(onClick).toHaveBeenCalled()
  })
})
