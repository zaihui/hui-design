import Taro from '@tarojs/taro'
/**
 * 封装的提示逻辑
 *
 * toast没有使用icon可以显示更多文字
 *
 * 垃圾微信，设计的api中loading和toast是同层的，因此无法同时使用
 * https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
 * hideLoading还会导致toast消失，所以下面这种常见的套路写法会有问题
 * async function handleSubmit() {
 *   try {
 *     SimpleHint.startLoading('提交中…')
 *     await api()
 *   } catch (e) {
 *     SimpleHint.error(e.title)
 *   } finally {
 *     SimpleHint.stopLoading()
 *   }
 * }
 * catch中展示的toast会被finally搞掉，推荐改用下面的写法
 * async function handleSubmit() {
 *   try {
 *     SimpleHint.startLoading('提交中…')
 *     await api()
 *     SimpleHint.stopLoading()
 *   } catch (e) {
 *     SimpleHint.stopLoading()
 *     SimpleHint.error(e.title)
 *   }
 * }
 */

export default {
  startLoading: (title: string): void => {
    Taro.showLoading({
      title,
      mask: true,
    })
  },
  stopLoading: (): void => {
    Taro.hideLoading()
  },
  success: (title: string): void => {
    Taro.showToast({
      title,
      mask: true,
      icon: 'none',
      duration: 1000,
    })
  },
  error: (title: string): void => {
    Taro.showToast({
      title,
      mask: true,
      icon: 'none',
      duration: 2000,
    })
  },
  simpleModal: (content: string, confirm: string): void => {
    Taro.showModal({
      title: '',
      content,
      showCancel: false,
      confirmText: confirm,
    })
  },
}
