/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
interface BaldrResponse<T> {
  code: number
  data: T
}

type Response<T> = BaldrResponse<T>;

interface Login {
  bindPhone: 0 | 1
  token: string
  wechatUser: {
    appId: string
    openId: string
    sessionKey: string
    unionId: string
  }
}

export const setToken = (token: string) => {
  let headers = {}
  headers = {
    Authorization: `Bearer ${token}`,
  }

  return headers
}

export default {
  login: (wxCode: string) =>
    Promise.resolve<Response<Login | null>>(wxCode ? {
      code: 200,
      data: {
        bindPhone: 1,
        token: 'token',
        wechatUser: {
          appId: 'appId',
          openId: 'openId',
          sessionKey: 'sessionKey',
          unionId: 'unionId',
        },
      },
    } : { code: 400, data: null }),
  bindPhone: (encryptedData, iv, sessionKey) =>
    Promise.resolve({ encryptedData, iv, sessionKey }),
}
