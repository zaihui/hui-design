/* eslint-disable no-underscore-dangle */
import React from 'react'
import { View, Text } from '@tarojs/components'
import cx from 'classnames'

import HuiIcon from '../Icon/Icon'
import { HIconType } from '../Icon/type'
import { ToastTypeProp, ToastTypeEnum } from './constants'

export interface HuiToastProps {
  /** 轻提示内容 */
  title: string
  /** 是否有遮罩层 */
  mask: boolean
  /** 轻提示类型： 成功（success）失败（fail）警告（warning）纯文本（text）自定义（custom） */
  type: ToastTypeProp
  /** 轻提示可见 */
  visible: boolean
  /** 轻提示持续显示的时间 */
  duration: number
  /** 轻提示自定义icon */
  icon: HIconType
}
interface State {
  _visible: boolean
}

const DefaultIconName: Map<ToastTypeProp, HIconType > = new Map([
  [ToastTypeEnum.SUCCESS, '003-right'],
  [ToastTypeEnum.WARNING, '002-warnings'],
  [ToastTypeEnum.FAIL, '001-close'],
])

export default class Index extends React.Component<HuiToastProps, State> {
  static defaultProps = {
    duration: 1500,
    visible: false,
    mask: false,
    icon: '',
  }

  state: State = {
    _visible: this.props.visible,
  }

  // eslint-disable-next-line react/sort-comp
  _timer: NodeJS.Timeout | null = null

  close(): void {
    const { _visible } = this.state
    if (_visible) {
      this.setState({
        _visible: false,
      })
      this.clearTimer()
    }
  }

  clearTimer(): void {
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  makeTimer(duration: number): void {
    if (duration === 0) return
    this._timer = setTimeout(() => {
      this.close()
    }, duration)
  }

  componentWillReceiveProps(nextProps: HuiToastProps): void {
    const { visible, duration } = nextProps
    if (!visible) {
      this.close()
      return
    }
    if (!this.state._visible) {
      this.setState({
        _visible: true,
      })
    } else {
      this.clearTimer()
    }
    this.makeTimer(duration || 0)
  }

  // eslint-disable-next-line class-methods-use-this
  getIconName(type: ToastTypeProp, customIcon: HIconType): HIconType {
    return DefaultIconName.get(type) || customIcon
  }

  render(): JSX.Element | null {
    const { type, title, icon } = this.props
    return this.state._visible ? (<View className={cx('hui-toast-box', { mask: this.props.mask })}>
      <View className='toast'>
        {
          type !== ToastTypeEnum.TEXT && (
          <View className='icon'>
            {
              (type as ToastTypeEnum) !== ToastTypeEnum.TEXT
              && <HuiIcon name={this.getIconName(type, icon)} size={36} />
            }
          </View>
          )
        }
        <Text className='text'>{ title }</Text>
      </View>
    </View>) : null
  }
}
