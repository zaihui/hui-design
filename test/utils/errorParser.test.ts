import errorParser, { getErrorTip, tipToString, ErrorLike } from '@/utils/errorParser'

describe('错误解析', () => {
  it('错误提示转字符串', () => {
    expect.hasAssertions()
    expect(tipToString('')).toBe('')
    expect(tipToString(['e1', 'e2'])).toBe('e1, e2')
    expect(tipToString([])).toBe('')
    expect(tipToString({ e1: 'msg1', e2: 'msg2' })).toBe('e1: msg1; e2: msg2')
    expect(tipToString({})).toBe('')
  })

  it('获取错误提示', () => {
    expect.hasAssertions()

    const e: ErrorLike = {
      errMsg: 'pay fail',
      message: 'request:fail',
      response: {
        data: {
          message: '404 not found',
          detail: '502 bad gate way',
        },
      },
      status: 200,
    }

    expect(getErrorTip(e)).toBe('pay fail')

    delete e.errMsg
    expect(getErrorTip(e)).toBe('请检查网络连接~')

    delete e.message
    expect(getErrorTip(e)).toBe('404 not found')

    delete e.response?.data.message
    expect(getErrorTip(e)).toBe('502 bad gate way')

    delete e.response?.data.detail
    expect(getErrorTip(e)).toStrictEqual({})

    delete e.response?.data
    expect(getErrorTip(e)).toBeUndefined()

    delete e.response
    e.message = 'unknown error'
    expect(getErrorTip(e)).toBe('unknown error')
  })

  it('错误处理', () => {
    expect.hasAssertions()
    expect(errorParser({} as ErrorLike)).toBe('发生了未知错误~')
    expect(errorParser({ message: 'err' } as ErrorLike)).toBe('err')
  })
})
