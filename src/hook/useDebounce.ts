import debounce from 'lodash/debounce'
import { useRef } from 'react'

type UseDebounceType = typeof debounce
const defaultFn = () => {}
const useDebounce: UseDebounceType = (fn, wait = 1000, options) => {
  const func = useRef(fn ?? defaultFn)
  func.current = fn
  const debounceWrapper = useRef(
    debounce((...args) => func.current?.(...args), wait, options) as any,
  )
  return debounceWrapper.current
}

export default useDebounce
