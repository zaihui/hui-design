import { Rule } from './formItem'

export const fieldPrefix = 'hui-form-item'
export const normalCss = `${fieldPrefix}-normal`
export const errorCss = `${fieldPrefix}-error`
export const disableCss = `${fieldPrefix}-disable`

export const validateInnerCustom = async (
  value: string,
  rule: Rule,
): Promise<string> => {
  if (!rule || !rule.length) return ''
  const [defaultRuleTarget] = rule

  const defaultRuleMsg = defaultRuleTarget.message
  if (!defaultRuleTarget?.validator) return defaultRuleMsg || '当前选项必填'
  try {
    return (await defaultRuleTarget?.validator(value)) as unknown as string
  } catch (err: any) {
    return err.message
  }
}
export const validatorRequireText = (value: string): string =>
  value || '当前选项必填'
export const validatorIntegerText = (value: string): string =>
  `${value}不是合理的数字`
export const validatorDigitText = (value: string): string =>
  `${value}不是合理的小数`

export interface FieldType {
  input
  inputNumber
  inputDigit
  picker
  textarea
  checkbox
  other
  datePicker
}
