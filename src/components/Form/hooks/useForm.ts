import { useMemo, useRef } from 'react'

import { FieldContext } from '../constants'
import FormStore from '../FormStore'

const useForm = (form?: FieldContext): [FieldContext] => {
  const formRef = useRef<FieldContext>()
  const formInstance: [FieldContext] = useMemo(() => {
    if (!formRef.current) {
      if (form) formRef.current = form
      else {
        const formStore = new FormStore()
        formRef.current = formStore.getForm()
      }
    }
    return [formRef.current]
  }, [form])
  return formInstance
}

export default useForm
