export const warning = (message: string): void => {
  if (console !== undefined) {
    console.error(`Warning: ${message}`)
  }
}

export const isNumber = (num: number): boolean => typeof num === 'number'
