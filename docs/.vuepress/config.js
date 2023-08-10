const path = require('path')
const webpack = require('webpack')

const sidebarCreator = require('./sidebarCreator')
const { homepage } = require('../../package.json')

const projectRootResolve = (dir) => path.join(__dirname, '../../', dir)

const loaderResolve = (file) => path.join(__dirname, './loader', file)

const navBar = [
  {
    text: '介绍',
    link: '/introduce/',
  },
  {
    text: 'ui组件',
    link: '/ui-gallery/',
  },
  {
    text: 'widget组件',
    link: '/widget-gallery/',
  },
  {
    text: '开发',
    link: '/development/',
  },
]

module.exports = {
  title: 'hui-design-文档',
  base:
    process.env.BUILD_ENV === 'prod'
      ? '/docs/hui-design/'
      : '/docs/hui-design-alpha/',
  description: 'hui-design文档系统',
  // dev时使用的端口
  port: '8088',
  dest: 'public/page-docs',
  patterns: [
    // vuepress支持.md和.vue文件，但vue文件怎么玩还有待研究
    '**/*.md',
  ],
  themeConfig: {
    // repo到editLinkText为引导给文档提pr的相关配置
    repo: homepage,
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '给这篇文档提PR！',
    logo: 'https://pasta.zaihui.com.cn/fe/extension/pangu-ext/-/avatar',
    nav: [...navBar],
    sidebar: sidebarCreator(navBar),
    // 配置侧边栏是否展示当前文档的标题链接
    displayAllHeaders: true,
    // 展示文档的最后更新时间
    lastUpdated: 'Last Updated',
  },
  /**
   * 只支持常青树浏览器（chrome/firefox等一直在更新的浏览器，区别于ie这种出厂系统自带一个就不管死活的浏览器），
   * 可以加快构建速度，减小构建体积
   */
  evergreen: true,
  plugins: [
    // 页面滚动时侧边栏和页面锚点同步的插件
    '@vuepress/active-header-links',
  ],
  configureWebpack: {
    resolve: {
      /**
       * 为了auto-doc组件，配置@为src的alias
       */
      alias: {
        '@': projectRootResolve('src'),
      },
    },
    resolveLoader: {
      alias: {
        AutoDocLoader: loaderResolve('AutoDocLoader.js'),
        ColorPaletteLoader: loaderResolve('ColorPaletteLoader.js'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          H5_BASE_URL:
            process.env.BUILD_ENV === 'prod'
              ? JSON.stringify('/docs/hui-design-h5/#')
              : JSON.stringify('/docs/hui-design-h5-alpha/#'),
        },
      }),
    ],
  },
}
