import React from 'react'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { StoreProps } from '@/store'

import { LoginWidget } from '@/index'

import './Login.scss'

@inject('userStore')
@observer
export default class Login extends React.Component<Pick<StoreProps, 'userStore'>> {
  // eslint-disable-next-line class-methods-use-this
  handleOnLogin(): void {
    // eslint-disable-next-line no-console
    console.log('login success')
  }

  // eslint-disable-next-line class-methods-use-this
  handleOnSettled(): void {
    // eslint-disable-next-line no-console
    console.log('settled')
  }

  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    return (
      <View className='login'>
        <LoginWidget
          isLogined={!!this.props.userStore.token}
          dispatchLogin={this.props.userStore.login}
          onLogined={this.handleOnLogin}
          dispatchGetPhone={this.props.userStore.bindPhone}
          isSettled={this.props.userStore.isSettled}
          onSettled={this.handleOnSettled}
          loginLoading='do wx.login'
          loginSuccessTip='wx.login done'
          getPhoneLoading='do getPhoneNumber'
          getPhoneSuccessTip='getPhoneNumber done'
        >
          <View
            className='login-button'
          >一键登录, 体验完整功能</View>
      </LoginWidget>
      </View>
    )
  }
}
