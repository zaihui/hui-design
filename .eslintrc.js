const isInVsCode = process.env.NODE_ENV === undefined

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    '@zaihui/base',
    'taro',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@zaihui/eslint-plugin-react'],
  env: {
    node: false,
    browser: false,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['packages/**/tsconfig.json'],
      },
    },
  },
  globals: {
    // 小程序本质不是运行在浏览器下，所以不能启用browser的env
    // 但有一些类似浏览器下的全局变量需要能够访问，所以在这里启用这些全局变量
    clearInterval: 'readonly',
    clearTimeout: 'readonly',
    setInterval: 'readonly',
    setTimeout: 'readonly',
    console: 'readonly',
    // 微信提供的wx、getCurrentPages、getApp三个特殊变量建议封装后使用，封装时可使用global xxx避免lint报错
    wx: 'off',
    getCurrentPages: 'off',
    getApp: 'off',
  },
  rules: {
    /**
     * 配置eslint的自带规则
     */
    // 禁止线上环境使用debugger和console
    //
    // 但因为debugger和console在开发环境经常会用到
    // 所以开发环境下只会显示为warning
    // 利用了vscode下process.env.NODE_ENV为undefined使用isInVsCode做了hack操作
    'no-debugger': isInVsCode ? 'warn' : 'error',
    'no-console': isInVsCode ? 'warn' : 'error',
    // 禁止一行以上的连续空行
    'react/no-find-dom-node': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'import/no-unresolved': 'off',
    // 关闭对象花括号换行一致性规则
    'object-curly-newline': 'off',
    // 关闭禁止在else前有return规则
    'no-else-return': 'off',
    // 强制在模块顶部调用 require()
    'global-require': 'error',
    // 开启使用{ ... }替代Object.assign规则
    'prefer-object-spread': 'error',
    /**
     * 配置eslint-plugin-import的规则
     *
     */
    // 关闭引用模块时一定要添加扩展名规则
    //
    // 未添加扩展名时按照webpack的resolve/extensions设定自动补全
    'import/extensions': 'off',
    // 禁止使用import * as xxx 语法引入模块
    //
    // 这种语法适合用作import * as Math这种用模块取代对象做命名空间的场景
    // 但在js下lint无法检查Math.someFunction是否在Math模块中有定义
    // 所以通常不要使用这种操作，特殊情况或ts语法下可以根据实际情况决定。
    'import/no-namespace': 'error',
    // 关闭优先使用export default规则
    'import/prefer-default-export': 'off',
    /**
     * taro init时生成的规则
     *
     */
    'no-unused-vars': 'off',
    'no-duplicate-imports': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true,
          },
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
  },
  overrides: [
    {
      files: ['**/*.js', '**/.*.js'],
      parser: 'esprima',
      env: {
        node: true,
      },
      rules: {
        'import/no-commonjs': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        /**
         * taro的枚举条件渲染写法中对象的属性一定要用引号包裹，否则运行时会报错
         * 参考：
         * https://github.com/NervJS/taro/issues/4343
         * https://github.com/NervJS/taro/issues/4343
         */
        'quote-props': 'off',
      },
    },
    {
      files: ['test/**/*.ts', 'test/**/*.tsx', 'test/**/*.js'],
      env: {
        jest: true,
      },
      settings: {
        'import/resolver': {
          typescript: {
            directory: './',
          },
        },
      },
      /**
       * TODO:
       * 开启了这里的extends会报Unexpected top-level property "overrides[2].extends".
       * 怀疑是vscode下eslint插件的报错，待研究
       */
      extends: ['plugin:jest/all'],
      rules: {
        'jest/prefer-inline-snapshots': 'off',
        'jest/prefer-called-with': 'off',
        'react/no-find-dom-node': 'off',
      },
    },
    /**
     * 针对vuepress下的lint规则
     */
    {
      files: ['docs/.vuepress/**/*.js', 'docs/.vuepress/**/*.vue'],
      extends: [
        'airbnb-base',
        '@zaihui/base',
        'plugin:vue/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'prettier',
      ],
      env: {
        node: true,
        browser: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    /**
     * 允许src/pages下使用@作为alias以方便demo编写
     */
    {
      files: ['src/pages/**/*.*'],
      settings: {
        'import/resolver': {
          typescript: {
            directory: './',
          },
        },
      },
    },
  ],
}
