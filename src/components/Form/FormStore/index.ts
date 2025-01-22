import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'

import { toArray, getErrorTarget, toString } from '../util'
import {
  FieldContext,
  FieldWatchCallback,
  registerWatchType,
} from '../constants'

interface Callbacks {
  onFinish: (store: Store) => void
  onFinishFailed: (error: string | object) => void
  onValuesChange: (newStore: Store, oldStore: Store) => void
  onReset: () => void
}

type Store = any

class FormStore {
  store: Store

  watchList: Map<string, any>

  fieldWatchList: Map<string, any>

  callbacks: Callbacks

  pendingUnset: string[][]

  timer: number | undefined

  constructor() {
    this.store = {}

    /**
     * name - key
     * onStoreChange - 更新方法
     * rules - 规则
     */
    this.watchList = new Map()

    this.fieldWatchList = new Map()

    this.callbacks = {
      onFinish() {},
      onFinishFailed() {},
      onValuesChange() {},
      onReset() {},
    }

    this.pendingUnset = []

    this.timer = undefined
  }

  registerWatch(id: string, field: registerWatchType): () => void {
    this.watchList.set(id, field)
    return () => {
      this.watchList.delete(id)
    }
  }

  registerFieldWatch(
    path: string,
    callback: FieldWatchCallback,
  ): (bool: boolean) => void {
    if (this.fieldWatchList.has(path)) {
      this.fieldWatchList.set(
        path,
        this.fieldWatchList.get(path).concat(callback),
      )
    } else {
      this.fieldWatchList.set(path, [callback])
    }

    return (bool) => {
      if (bool) {
        this.fieldWatchList.delete(path)
      } else if (this.fieldWatchList.has(path)) {
        this.fieldWatchList.set(
          path,
          this.fieldWatchList.get(path)?.filter((fn) => fn !== callback),
        )
      }
    }
  }

  async handleChange(change?: object): Promise<void> {
    await Promise.resolve()
    this.callbacks?.onValuesChange?.(change ?? {}, this.store)
  }

  getFieldValue(name: string | string[]): any {
    // undefined来区分首次
    return get(this.store, toArray(name), undefined)
  }

  removeFieldValue(name: string | string[]): void {
    this.pendingUnset.push(toArray(name))
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      while (this.pendingUnset.length) {
        const cur = this.pendingUnset.pop() as string[]
        unset(this.store, cur)
        this.notifywatchList(cur)
      }
      this.handleChange()
    }, 30)
  }

  getFieldsValue = (): any => this.store

  setFieldValue<T>(name: string | string[], value: T): void {
    if (this.getFieldValue(name) !== value) {
      set(this.store, toArray(name), value)
      this.handleChange({ name, value })
      this.notifywatchList(name)
    }
  }

  setFieldsValue(newStore: Store): void {
    const newStoreTarget = {
      ...this.store,
      ...newStore,
    }
    this.updateStore(newStoreTarget)
    this.handleChange()
    this.notifywatchList()
  }

  resetStore = (): void => {
    const restTarget = Object.keys(this.store).reduce(
      (pre, cur) => ({
        ...pre,
        [cur]: undefined,
      }),
      {},
    )
    this.updateStore(restTarget)
    this.notifywatchList()
  }

  setCallbacks(callbacks: Callbacks): void {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    }
  }

  notifywatchList(name?: string | string[]): void {
    if (!name) {
      this.fieldWatchList.forEach((fns) => fns.forEach((fn) => fn(this.store)))
    }
    this.watchList.forEach((field: any) => {
      const { onStoreChange } = field
      const fieldName = toString(field.name)

      if (name) {
        if (this.fieldWatchList.has(fieldName)) {
          this.fieldWatchList.get(fieldName).forEach((fn) => fn(this.store))
        }
        if (toString(name) === fieldName) {
          onStoreChange()
        }
      } else {
        onStoreChange()
      }
    })
  }

  async validatorFields(): Promise<void | null | string> {
    const errorValiadtorArr: any[] = []
    const valiadtorPromiseArr: any[] = []
    this.watchList.forEach(({ validatorRules, name }) => {
      valiadtorPromiseArr.push(validatorRules(this.getFieldValue(name) ?? ''))
    })

    const allRes = await Promise.all(valiadtorPromiseArr)

    if (!Array.isArray(allRes)) throw new Error(allRes)
    allRes.forEach(
      ({ state, name }) =>
        !state &&
        errorValiadtorArr.push({
          name,
          value: this.getFieldValue(name),
        }),
    )
    if (!errorValiadtorArr.length) return this.getFieldsValue()
    const { name, value } = errorValiadtorArr[0]
    throw new Error(JSON.stringify({ [name]: value }))
  }

  updateStore(nextStore: Store): void {
    this.store = nextStore
  }

  async submit(): Promise<any> {
    const { onFinish, onFinishFailed } = this.callbacks
    let result
    await this.validatorFields()
      .then((res) => {
        result = {
          type: 'success',
          data: res,
        }
        onFinish(res)
      })
      .catch((err) => {
        const valiadtorErroTarget = getErrorTarget(err)
        result = {
          type: 'fail',
          data: valiadtorErroTarget,
        }
        onFinishFailed(valiadtorErroTarget || {})
        this.watchList.forEach(
          ({ setSubmitTotal }) =>
            setSubmitTotal && setSubmitTotal((pre) => pre + 1),
        )
      })
    return result
  }

  async reset(): Promise<void> {
    const { onReset } = this.callbacks
    try {
      this.resetStore()
      const arr: any = []
      this.watchList.forEach(({ validatorRules }) => {
        arr.push(validatorRules(undefined))
      })
      await Promise.all(arr)
      onReset()
    } catch (error) {}
  }

  getForm(): FieldContext {
    return {
      removeFieldValue: this.removeFieldValue.bind(this),
      getFieldValue: this.getFieldValue.bind(this),
      getFieldsValue: this.getFieldsValue.bind(this),
      setFieldsValue: this.setFieldsValue.bind(this),
      setFieldValue: this.setFieldValue.bind(this),
      validatorFields: this.validatorFields.bind(this),
      setCallbacks: this.setCallbacks.bind(this),
      registerWatch: this.registerWatch.bind(this),
      registerFieldWatch: this.registerFieldWatch.bind(this),
      submit: this.submit.bind(this),
      reset: this.reset.bind(this),
    }
  }
}

export default FormStore
