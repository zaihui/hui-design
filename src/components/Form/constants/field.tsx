export const fieldPrefix = 'h-form-item'
export const normalCss = `${fieldPrefix}-normal`
export const errorCss = `${fieldPrefix}-error`
export const disableCss = `${fieldPrefix}-disable`

export const validatorRequireText = (value: string): string => value || '当前选项必填'
export const validatorIntegerText = (value: string): string => `${value}不是合理的数字`
export const validatorDigitText = (value: string): string => `${value}不是合理的小数`

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
