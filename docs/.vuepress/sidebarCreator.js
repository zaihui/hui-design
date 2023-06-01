const fs = require('fs')
const path = require('path')

// 获取目录下的全部文件
const getFiles = (dir) =>
  fs.readdirSync(dir).filter((sub) => fs.statSync(path.join(dir, sub)).isFile())

// 获取目录对应的sidebar
const getSidebarOfDir = (dir) =>
  // 注意这里的获取文件目录与代码所在的文件路径有关
  getFiles(path.resolve(__dirname, '../', dir))
    // 只取md文件
    .filter((name) => name.endsWith('.md'))
    // 去掉文件的扩展名
    .map((name) => name.replace(/\.md$/g, ''))
    // 忽略掉readme文件
    .filter((name) => name.toLowerCase() !== 'readme')

/**
 * vuepress默认的主体配置可以为文档页面生成侧边栏
 * 但侧边栏的配置需要手动编写，并不能按照目录下文件自动生成（可能是因为自动生成无法保证前后顺序）
 * 但我们对文档顺序的要求不那么高，自动生成可以减少我们的工作量
 * 所以这里的sidebar通过脚本自动生成
 * 侧边栏配置的格式说明见这里：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#多个侧边栏
 * 最终生成的格式如下：
 * 以文件夹对应的path为对象的key，以文件夹下文件名组成数组内容
 * 注意vuepress文档上虽然说.md可以省略，但实测如果没有省略会导致路径匹配不上
 * 同时文件名开头不能有'/'，readme因为会被编译为index所以也会报错。
 * ```
 * sidebar: {
 *  '/dirname/': [ 'file1' ],
 * }
 * ```
 * 同时参考了vuepress自己的文档页面的侧边栏配置：
 * https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/.vuepress/config.js
 */

module.exports = (navList) =>
  navList.reduce((result, nav) => {
    const { link } = nav
    return {
      ...result,
      [link]: getSidebarOfDir(link.replace(/\//g, '')),
    }
  }, {})
