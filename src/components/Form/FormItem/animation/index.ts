import Taro from '@tarojs/taro'
import { useCallback, useState } from 'react'

const useAnimationCss = (css: string, state: boolean, duration = 200): [() => void, string] => {
  const [className, setClassName] = useState('')
  const implement = useCallback(() => {
    if (!state) return
    setClassName(css)
    Taro.vibrateShort({
      type: 'medium',
    })
    setTimeout(() => setClassName(''), duration)
  }, [state, css, duration])
  return [implement, className]
}

export { useAnimationCss }
