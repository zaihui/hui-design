export const toArray = (element: string | any[]): any[] =>
  (Array.isArray(element) ? element : [element])

export function getErrorTarget(err: Error): string | null {
  const msg = err.message.replace('Error: ', '')
  try {
    if (typeof msg === 'string' && typeof JSON.parse(msg) === 'object') {
      return JSON.parse(msg) || {}
    }
  } catch (error) {
    return null
  }
  return null
}

export const replaceComma = (str = ''): string => str.toString().replace(/,/g, '')
