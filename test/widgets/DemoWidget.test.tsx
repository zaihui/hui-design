import React from 'react'

import { renderToString } from 'nerv-server'
import DemoWidget from '@/widgets/DemoWidget/DemoWidget'

describe('demoWidget Snap', () => {
  it('render DemoWidget without prop2', () => {
    expect.hasAssertions()
    expect(renderToString(<DemoWidget
      prop1='foo'
    />)).toMatchSnapshot()
  })
  it('render DemoWidget with prop2', () => {
    expect.hasAssertions()
    expect(renderToString(<DemoWidget
      prop1='foo'
      prop2={233}
    />)).toMatchSnapshot()
  })
})
