import { replaceComma } from '../../util'

import { checkDigit, checkInteger } from './checkNumber'

import { ItemType, Rule } from '../../constants'
import {
  FieldType,
  errorCss,
  normalCss,
  validatorDigitText,
  validatorIntegerText,
  validatorRequireText,
} from '../../constants/field'

interface ValidatorType {
  inner
  rule
  custom
}

/**
 * 内部校验
 */
const validatorInnerField = (value: string, itemType: keyof ItemType) => {
  switch (itemType) {
    case 'inputNumber':
      return checkInteger(replaceComma(value))[0]
    case 'inputDigit':
      return checkDigit(replaceComma(value))[0]
    default:
      return true
  }
}

const validatorRule = (
  rule: Rule | undefined,
  value: string,
  fieldType: keyof ItemType,
  getFieldValue: any,
): {
  fieldState: boolean
  validatorType: keyof ValidatorType
} => {
  const [defaultRuleTarget, customRuleFun] = rule ?? []
  const { require, pattern } = defaultRuleTarget ?? {}
  let globalInputStatus = true

  // 内部值检验
  const innerCheckResult = value ? validatorInnerField(value, fieldType) : true
  if (!innerCheckResult) {
    return {
      fieldState: innerCheckResult,
      validatorType: 'inner',
    } as any
  }

  // 自定义校验
  if (typeof customRuleFun === 'function') {
    // 由于form item memo，rule里面的函数拿不到外部的值，提供getFieldValue函数，后续修改memo逻辑
    return {
      fieldState: customRuleFun(value, {
        getFieldValue,
      }),
      validatorType: 'custom',
    } as any
  }

  // rule校验 - 取两者皆不存在的反 - 任意一个存在
  if (!(!require && !pattern)) {
    let result = true
    if ([null, undefined, ''].includes(value as any)) {
      result = false
    }
    globalInputStatus = pattern ? pattern.test(value) : result
  }

  return {
    fieldState: globalInputStatus,
    validatorType: 'rule',
  }
}

const validatorStyleInner = (
  type: keyof FieldType,
  value: string,
): [string, string] => {
  let str = ''
  switch (type) {
    case 'inputNumber':
      str = validatorIntegerText(value)
      break
    case 'inputDigit':
      str = validatorDigitText(value)
      break
    default:
      break
  }
  return [errorCss, str]
}

const validatorStyle = (
  validatorType: keyof ValidatorType,
  type: keyof FieldType,
  value: string,
  rule: Rule | undefined,
): [string, string] => {
  switch (validatorType) {
    case 'custom':
      return [errorCss, validatorRequireText(rule?.[0]?.message ?? '')]

    case 'inner':
      return validatorStyleInner(type, value)
    case 'rule':
      return [errorCss, validatorRequireText(rule?.[0]?.message ?? '')]
    default:
      return [errorCss, '']
  }
}

const validatorField = <T>(
  rule: Rule | undefined,
  value: string | undefined,
  fieldType: keyof ItemType,
  getFieldValue: T,
): string[] => {
  if (typeof value === 'undefined') return [normalCss, '']
  const { fieldState, validatorType } = validatorRule(
    rule,
    value,
    fieldType,
    getFieldValue,
  )
  if (fieldState) {
    // 兼容下item里面的处理
    return [normalCss, '']
  }
  return validatorStyle(validatorType, fieldType, value, rule)
}

export default validatorField
