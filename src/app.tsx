/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { PropsWithChildren, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'mobx-react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import store from './store'
import { DESIGN_WIDTH } from './utils/constant'

import './app.scss'

dayjs.extend(duration)
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const App: React.FC<PropsWithChildren> = props => {
  useEffect(() => {
    Taro.initPxTransform({
      designWidth: DESIGN_WIDTH,
      deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2,
        '375': 2 / 1,
      },
    })
  }, [])
  return <Provider {...store}>{props.children}</Provider>
}

export default App
