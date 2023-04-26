import React from 'react'
import { View } from '@tarojs/components'

import { DemoWidget } from '@/index'

import './Demo.scss'

export default class Demo extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    /**
     * 由于partial import使用正则匹配region，尚未支持react大括号中嵌套注释的做法
     * 所以只能采取将case提取出来的方式变通
     *
     * 锚点的格式为以region开头和endregion结尾，后接锚点名
     */
    // eslint-disable-next-line operator-linebreak
    const DemoWidteCase1 =
    /* #region DemoWidget-case1 */
    <DemoWidget
      prop1='hello world'
      prop2={2333}
    />
    /* #endregion DemoWidget-case1 */
    return (
      <View className='demo'>
        {DemoWidteCase1}
      </View>
    )
  }
}
