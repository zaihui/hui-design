import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

export const useBoundingClientRect: (
  ref: React.MutableRefObject<any>,
) =>
  | Taro.NodesRef.BoundingClientRectCallbackResult
  | null
  | undefined = ref => {
    const [info, setInfo] = useState<
    Taro.NodesRef.BoundingClientRectCallbackResult
  >()

    useEffect(() => {
    // 使用nextTick保证在 onReady之后在执行： https://github.com/NervJS/taro/issues/6501
      Taro.nextTick(() => {
        if (ref.current) {
          const query = Taro.createSelectorQuery()
          if (!ref.current.className) {
            throw new Error(
              '[useBoundingClientRect] 传入的Taor.TaroElement对象需要有className',
            )
          }
        // eslint-disable-next-line no-unused-expressions
        query.select(`.${ref.current?.className}`)?.boundingClientRect(rect => {
          setInfo(rect)
        })
        query.exec()
        }
      })
    }, [])

    return info
  }
