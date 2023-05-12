/**
 * 将错误处理为易于理解的字符串供toast等展示
 *
 */

/**
 * 很多场景下传入的error不一定是严格的error对象，可能是自定义的对象或扩展了的error对象
 */
export interface ErrorLike {
  message: string
  status: number
  response?: {
    data: {
      message: string
      detail: string
    }
  }
  errMsg: string
}

/**
 * 从error中提取有效的tip信息
 */
export const getErrorTip = (error: ErrorLike): unknown => {
  /**
   * e.message
   * e.config
   * e.status
    */
  const {
    errMsg,
    message,
    response,
  } = error

  // 有errMsg大概率是微信的错误，如支付返回requestPayment:fail等等
  if (errMsg) {
    return errMsg
  }

  /**
   * message以request:fail说明是手机网络出问题了
   *
   * 微信给的错误信息在模拟器上是是：'request:fail '，在手机上是：'request:fail ssl hand shake error'
   * 如果接口不在域名白名单里：request:fail url not in domain list
   */

  if (message && message.startsWith('request:fail')) {
    return '请检查网络连接~'
  }

  /**
   * 如果有存在response说明是4xx/5xx之类的错误，优先使用response作为错误提示
   */
  if (response) {
    const { data } = response
    // 子岳说：普通400会在message里放颜文字
    return data ? (data.message || data.detail || data) : data
  }

  return message
}

/**
 * 将提取到的错误信息转化为字符串
 */
export const tipToString = (tip: unknown): string => {
  if (typeof tip === 'object') {
    if (Array.isArray(tip)) {
      return tip.join(', ')
    }
    return Object.entries(tip as []).map(([key, value]) => `${key}: ${value}`).join('; ')
  }
  return tip as string
}

export default (error: ErrorLike): string => {
  const tip = getErrorTip(error)
  return tipToString(tip) || '发生了未知错误~'
}
