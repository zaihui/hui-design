export const isInteger = (value: string): boolean => /^\d+$/.test(value)

export const isDigit = (float: string): boolean => /^\d+(\.?\d{0})$/.test(float)

/**
 * 检查正整数
 */
export const checkInteger = (value: string): [boolean, null | string] =>
  isInteger(value) ? [true, null] : [false, `${value}不是合理的数字`]

/**
 * 检查小数
 */
export const checkDigit = (value: string): [boolean, null | string] =>
  isDigit(value) ? [true, null] : [false, `${value}不是合理的小数`]
