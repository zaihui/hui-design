import React from 'react'
import { Button, Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ButtonProps } from '@tarojs/components/types/Button'
import { BaseEventOrig } from '@tarojs/components/types/common'
import errorParser from '../../utils/errorParser'
import SimpleHint from '../../services/SimpleHint'

import './LoginWidget.scss'

/**
 * 通用的登录逻辑组件
 * 预设用于绑定手机号完成身份验证的场景
 *
 * 对于这种场景，或许用户身份的手段有两种（暂时不考虑获取头像昵称信息）
 * - 静默使用code换openId（一定条件下可以获得unionId）
 * - 用户授权手机号
 *
 * 手机号作为用户身份的唯一标识可以更方便跨平台使用、将openId/unionId与手机号关联可以实现静默登录提升用户体验
 *
 * 因此组件的基本逻辑如下
 * - 首先利用code获取用户身份，如果用户已授权手机号则登录逻辑全部完成
 * - 如果使用code获取到的用于身份未授权手机号，则展示授权手机号的按钮提示用户授权手机号
 *
 * 对应状态参见Props
 */
export interface LoginWidgetProps {
  // 是否已调用过wx.login，可以用openId、sessionKey等作为判断依据
  isLogined: boolean
  // 组件挂载后发现isLogined为true时的回调
  onLogined: () => void
  // 组件挂载后发现isLogined为false时触发的解码code逻辑
  dispatchLogin: (code: string) => void
  // login时的loading提示
  loginLoading: string
  // login成功后的提示信息
  loginSuccessTip: string
  // 用户手动授权手机号时的解码操作
  dispatchGetPhone: (encryptedData: string, iv: string) => void
  // 授权手机号时的loading提示
  getPhoneLoading: string
  // 授权手机号成功后的提示信息
  getPhoneSuccessTip: string
  // 是否已经有了完全的用户身份？可以用token、phone等作为判断依据
  isSettled: boolean
  // 组件挂载后发现isSettled为true时的回调
  onSettled: () => void
  // 授权手机号的ui提示部分
  children: React.ReactNode
}

export default class LoginWidget extends React.Component<LoginWidgetProps> {
  componentDidMount(): void {
    this.handleInit()
  }

  /**
   * 初始化逻辑
   * 注意在settled状态下会同时出发onLogin和onSettled，因为settled时isLogined确实满足
   */
  handleInit(): void {
    if (this.props.isLogined) {
      this.props.onLogined()
    } else {
      this.handleLogin()
    }
    if (this.props.isSettled) {
      this.props.onSettled()
    }
  }

  handleLogin = async (): Promise<void> => {
    const { code } = await Taro.login()
    try {
      SimpleHint.startLoading(this.props.loginLoading)
      await this.props.dispatchLogin(code)
      this.handleIfLogined()
      this.handleIfSettled()
      SimpleHint.stopLoading()
    } catch (e) {
      SimpleHint.stopLoading()
      SimpleHint.error(errorParser(e))
    }
  }

  handleBind = async (
    event: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>,
  ): Promise<void> => {
    const { encryptedData, iv } = event.detail
    if (!encryptedData || !iv) {
      return
    }
    try {
      SimpleHint.startLoading(this.props.getPhoneLoading)
      await this.props.dispatchGetPhone(encryptedData, iv)
      this.handleIfSettled()
      SimpleHint.stopLoading()
    } catch (e) {
      SimpleHint.stopLoading()
      SimpleHint.error(errorParser(e))
    }
  }

  handleIfLogined(): void {
    if (this.props.isLogined) {
      if (this.props.loginSuccessTip) {
        SimpleHint.success(this.props.loginSuccessTip)
      }
      this.props.onLogined()
    }
  }

  handleIfSettled(): void {
    if (this.props.isSettled) {
      if (this.props.getPhoneSuccessTip) {
        SimpleHint.success(this.props.getPhoneSuccessTip)
      }
      this.props.onSettled()
    }
  }

  render(): JSX.Element {
    return (
      this.props.isSettled ? <Block /> : <Button
        plain
        openType='getPhoneNumber'
        className='login-widget button-reset'
        onGetPhoneNumber={this.handleBind}
      >
        { this.props.children }
      </Button>
    )
  }
}
