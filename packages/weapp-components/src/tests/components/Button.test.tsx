import React from 'react'
import Taro from '@tarojs/taro'
import { Block } from '@tarojs/components'
import { findDOMNode } from 'nervjs'
import { renderToString } from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'

import HuiButton from '@/components/Button/Button'

Taro.initPxTransform({ designWidth: 375, deviceRatio: {} })

describe('huiButton Snap', () => {
  it('renders HuiButton', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton>按钮文字</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - type', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton type='primary'>主操作按钮</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - width', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton width={188}>自定义宽度</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - block', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton block>按钮文字</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - size', () => {
    expect.hasAssertions()
    const component = renderToString(
      <Block>
        <HuiButton size='small'>按钮文字</HuiButton>
        <HuiButton size='medium'>按钮文字</HuiButton>
        <HuiButton size='large'>按钮文字</HuiButton>
      </Block>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - color', () => {
    expect.hasAssertions()
    const component = renderToString(
      <Block>
        <HuiButton size='small' color='#ed3737'>按钮文字</HuiButton>
        <HuiButton size='small' color='#ff6c00'>按钮文字</HuiButton>
      </Block>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - disabled', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton disabled>按钮文字</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - icon', () => {
    expect.hasAssertions()
    const component = renderToString(
      <Block>
        <HuiButton prefixIcon='003-right'>按钮文字</HuiButton>
        <HuiButton suffixIcon='003-right'>按钮文字</HuiButton>
      </Block>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - extra', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton extra='辅助文字' size='large'>按钮文字</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders HuiButton - extra with size m', () => {
    expect.hasAssertions()
    const component = renderToString(
      <HuiButton extra='辅助文字'>按钮文字</HuiButton>,
    )
    expect(component).toMatchSnapshot()
  })
})

describe('huiButton Event', () => {
  it('huiButton onClick', () => {
    expect.hasAssertions()
    const onClick = jest.fn()
    const component = renderIntoDocument(
      <HuiButton onClick={onClick}>按钮文字</HuiButton>,
    )
    const componentDom = findDOMNode(component, 'hui-button')
    Simulate.click(componentDom)
    expect(onClick).toHaveBeenCalled()
  })

  it('huiButton onClick - disabled', () => {
    expect.hasAssertions()
    const onClick = jest.fn()
    const component = renderIntoDocument(
      <HuiButton disabled onClick={onClick}>按钮文字</HuiButton>,
    )
    const componentDom = findDOMNode(component, 'hui-button')
    Simulate.click(componentDom)
    expect(onClick).not.toHaveBeenCalled()
  })
})
