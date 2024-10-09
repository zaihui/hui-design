import { useEffect, useMemo, useRef, useState } from 'react'
import get from 'lodash/get'
import { FieldContext, NamePath } from '../constants'
import { toArray, toString } from '../util'

function stringify(value) {
  try {
    return JSON.stringify(value)
  } catch (err) {
    return Math.random()
  }
}
export default function useWatch(path: NamePath, form: FieldContext): any {
  const [value, setValue] = useState<any>()

  const valueStr = useMemo(() => stringify(value), [value])
  const valueStrRef = useRef(valueStr)
  valueStrRef.current = valueStr

  const namePath = toArray(path)
  const namePathRef = useRef(namePath)
  namePathRef.current = namePath

  useEffect(() => {
    const { getFieldsValue, registerFieldWatch } = form
    const getWatchValue = (values: any) => get(values, namePathRef.current)

    const cancelRegister = registerFieldWatch(
      toString(namePathRef.current),
      (values) => {
        const newValue = getWatchValue(values)
        const nextValueStr = stringify(newValue)

        if (valueStrRef.current !== nextValueStr) {
          valueStrRef.current = nextValueStr
          setValue(newValue)
        }
      },
    )

    const initialValue = getWatchValue(getFieldsValue())

    if (value !== initialValue) {
      setValue(initialValue)
    }

    return cancelRegister
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return value
}
