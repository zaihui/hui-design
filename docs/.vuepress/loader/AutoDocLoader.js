/**
 * 自定义loader利用react-docgen提取tsx文件中的文档
 */
const reactDocs = require('react-docgen-typescript')

const createResult = result => `module.exports = ${JSON.stringify(result)}`

module.exports = function () {
  const { resourcePath } = this
  /**
   * webpack的dynamic-import其实是会根据import的的固定部分路径来引入目录下的全部文件
   * 所以这里手动判断是否以tsx结尾以忽略不必要的文件。
   * 参考：https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
   *
   * resourcePath是当前loader处理的文件的路径
   * 参考：https://webpack.js.org/api/loaders/#thisresourcepath
   */
  if (resourcePath.endsWith('.tsx')) {
    const docs = reactDocs.withCustomConfig(`${__dirname}/../../../tsconfig.json`).parse(resourcePath)[0]

    return createResult(docs || '')
  }
  return createResult('')
}
