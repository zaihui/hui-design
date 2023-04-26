/**
 * 根据页面名生成页面路径
 */
export const getPagePath = (packageName: string, pageName: string): string =>
  (packageName ? `/${packageName}/pages/${pageName}/${pageName}` : `/pages/${pageName}/${pageName}`)

/**
 * 将对象格式参数转化为get请求格式的参数字符串
 *
 * 注意因为小程序和taro本身都没有对%?=等字符进行转义操作，
 * 所以这里的转换也没有进行转义，如果后期希望传输非安全字符需要改造这一块
 *
 * 同时注意传入的对象中的value必须为字符串否则会产生意料之外的结果
 */
export const getParamsString = (params: Record<string, unknown>): string =>
  Object.entries(params).map(([key, value]): string => `${key}=${value}`).join('&')

/**
 * 根据页面名和参数对象生成页面url
 */
export const getPageUrl = (
  packageName: string, pageName: string, params = {},
): string => {
  const pagePath = getPagePath(packageName, pageName)

  return `${pagePath}?q=${encodeURIComponent(JSON.stringify(params))}`
}
