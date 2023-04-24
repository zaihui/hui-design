import React from 'react'
import { View } from '@tarojs/components'

export interface DemoWidgetProps {
  /**
   * 一个字符串型的属性
   */
  prop1: string
  /**
   * 一个数值类型的可选属性
   */
  prop2?: number
}
/**
 * 一个示例Widget
 */
export default class LoginWidget extends React.Component<DemoWidgetProps> {
  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    const { prop1, prop2 = 0 } = this.props
    return (
      <View className='demo-widget'>
        this is DemoWidget
        <View>prop1 is {prop1}</View>
        <view>prop2 is {prop2}</view>
      </View>
    )
  }
}
