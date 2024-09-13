import React, { ReactNode, useCallback, useMemo, useState } from 'react'

type ModalResponse = any | undefined

interface PropsControl {
  value: ModalResponse
  visible: boolean
  onModalOk: (vle?: ModalResponse) => void
  onCancel: () => void
  mergeProps?: object
}

export type ActionType = 'cancel' | 'ok'

interface PickerValue {
  type: ActionType
  value?: ModalResponse
}

export type ShowModalType<T> = (
  val?: T,
  otherProps?: object,
) => Promise<PickerValue>

interface MapProps {
  value?: string
  visible?: string
  onModalOk?: string
  onCancel?: string
  onClose?: string
  props?: object
}

type useHandleModal = <T>(
  Component: React.FC,
  mapProps: MapProps,
) => UseHandleModalPromise<T>

export interface UseHandleModalPromise<T> {
  node: ReactNode
  show: ShowModalType<T>
  props: PropsControl
}

export const useHandleModalPromise: useHandleModal = <T,>(
  Component,
  mapProps: MapProps,
) => {
  const [callback, setCallback] = useState<(PickerValue) => void>(() => {})
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<ModalResponse>()
  const [mergeProps, setMergeProps] = useState<any>()

  const { beforeFn, restProps } = useMemo(() => {
    const { beforeOk, ...rest } = mergeProps ?? {}

    return {
      beforeFn: beforeOk,
      restProps: rest,
    }
  }, [mergeProps])

  const showModal: ShowModalType<T> = useCallback((val, otherProps) => {
    setValue(val)
    setMergeProps({ ...otherProps })
    setVisible(true)
    return new Promise((resolve) => {
      setCallback(() => resolve)
    })
  }, [])

  const onCancel = useCallback(() => {
    setVisible(false)
    callback?.({
      type: 'cancel',
    })
  }, [callback])

  const onClose = useCallback(() => {
    setVisible(false)
    callback?.({
      type: 'close',
    })
  }, [callback])

  const onModalOk = useCallback(
    async (e) => {
      let res = true
      if (beforeFn) {
        try {
          await beforeFn()
        } catch (error) {
          res = false
        }
      }
      if (res) {
        setVisible(false)
        callback?.({
          type: 'ok',
          value: e,
        })
      }
    },
    [beforeFn, callback],
  )

  const propsControl = useMemo(
    () => ({
      value,
      visible,
      onModalOk,
      onCancel,
      onClose,
      mergeProps,
    }),
    [value, visible, onModalOk, onCancel, onClose, mergeProps],
  )

  const componentProps = useMemo(() => {
    const propsValue = mapProps.value || 'value'
    const propsVisible = mapProps.visible || 'visible'
    const propsOnModalOk = mapProps.onModalOk || 'onModalOk'
    const propsOnCancel = mapProps.onCancel || 'onCancel'
    const propsOnClose = mapProps.onClose || 'onClose'
    return {
      [propsValue]: propsControl.value ?? mapProps?.props?.[propsValue],
      [propsVisible]: propsControl.visible ?? mapProps?.props?.[propsVisible],
      [propsOnModalOk]:
        propsControl.onModalOk ?? mapProps?.props?.[propsOnModalOk],
      [propsOnCancel]:
        propsControl.onCancel ?? mapProps?.props?.[propsOnCancel],
      [propsOnClose]: propsControl.onClose ?? mapProps?.props?.[propsOnClose],
    }
  }, [
    mapProps.onCancel,
    mapProps.onClose,
    mapProps.onModalOk,
    mapProps?.props,
    mapProps.value,
    mapProps.visible,
    propsControl.onCancel,
    propsControl.onClose,
    propsControl.onModalOk,
    propsControl.value,
    propsControl.visible,
  ])

  return {
    node: <Component {...componentProps} {...restProps} />,
    show: showModal,
    props: propsControl,
  }
}
