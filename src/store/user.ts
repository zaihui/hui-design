import { action, observable, computed } from 'mobx'
import api, { setToken } from '../api/index'

export class User {
  @observable token = '';

  @observable isBindPhone = false;

  @observable sessionKey = '';

  @computed
  get isSettled(): boolean {
    return !!(this.isBindPhone && this.token)
  }

  @action.bound
  async login(code: string): Promise<void> {
    const { data } = await api.login(code)
    const {
      token,
      bindPhone,
      wechatUser,
    } = data || {}

    this.isBindPhone = bindPhone === 1
    this.token = token || ''
    this.sessionKey = wechatUser?.sessionKey || ''

    if (token) {
      setToken(token)
    }
  }

  @action.bound
  async bindPhone(encryptedData: string, iv: string): Promise<void> {
    await api.bindPhone(encryptedData, iv, this.sessionKey)
    this.isBindPhone = true
  }
}

export default new User()
