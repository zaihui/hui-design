const path = require('path')

const devConfig = require('./dev')
const alphaConfig = require('./alpha')
const prodConfig = require('./prod')

const config = {
  projectName: 'example',
  framework: 'react',
  date: '2020-5-6',
  designWidth: 375,
  deviceRatio: {
    375: 2 / 1,
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  defineConstants: {
  },
  alias: {
    '@': path.resolve(__dirname, '../src/'),
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      pxtransform: {
        enable: true,
        config: {

        },
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function (merge) {
  const getEnvConfig = environment => {
    if (environment === 'prod') {
      return prodConfig
    }

    return alphaConfig
  }
  return merge(
    config,
    process.env.NODE_ENV === 'development' ? devConfig : getEnvConfig(process.env.BUILD_ENV),
  )
}
