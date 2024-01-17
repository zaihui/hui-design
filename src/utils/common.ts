export const warning = (message: string): void => {
  if (console !== undefined) {
    console.error(`Warning: ${message}`)
  }
}

export const isNumber = (num: number): boolean => typeof num === 'number'

export const countCommonStrings = (
  arr1: (string | number)[],
  arr2: (string | number)[],
): (string | number)[] => {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)

  const res: (string | number)[] = []

  set1.forEach((str) => {
    if (set2.has(str)) {
      res.push(str)
    }
  })

  return res
}
