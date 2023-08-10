/**
 * jest搭配ts使用需要对babel进行配置
 * 参考：
 * - https://jestjs.io/docs/en/getting-started.html#using-typescript
 *
 * 更多关于测试的说明可参考文档[UnitTest.md]
 */
const isTest = process.env.NODE_ENV === 'test'
const testConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'Nerv.createElement',
      },
    ],
    [
      'babel-plugin-auto-import',
      {
        declarations: [
          {
            default: 'Nerv',
            path: 'nervjs',
          },
        ],
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    /**
     * typescript可以直接在class中声明属性，而js目前只能在constructor中创建属性
     * 相关的提案已经进入stage-3：https://github.com/tc39/proposal-class-fields
     * node从v12开始支持这一特性
     * 由于babel-preset-env默认不包含stage-x中的插件
     * 所以对于v12之前的node，需要手动启用class-properties
     * 参考：
     * https://www.babeljs.cn/docs/babel-preset-env#how-does-it-work
     * https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
     * https://babeljs.io/docs/en/next/babel-plugin-transform-typescript.html
     * https://devblogs.microsoft.com/typescript/typescript-and-babel-7/
     * https://github.com/babel/babel/issues/6604
     * https://github.com/tc39/proposals
     */
    '@babel/plugin-proposal-class-properties',
  ],
}

const devConfig = {
  sourceMap: true,
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
}
const config = isTest ? testConfig : devConfig
module.exports = config
