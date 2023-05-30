/**
 * 搬运forseti下的stylelint规则
 */
module.exports = {
  extends: [
    /**
     * stylelint提供的标准配置
     * 比stylelint-config-recommended要求更严格
     */
    'stylelint-config-standard',
    /**
     * css属性顺序规则集
     */
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-use-nesting',
    'stylelint-csstree-validator',
    'stylelint-declaration-use-variable',
  ],
  rules: {
    /**
     * 配置stylelint的自带规则
     */
    // 关闭stylelint的at-rule-no-unknown规则
    // 因为scss使用了@include等，所以stylelint提供的at-rule-no-unknown不再适用，转而使用scss插件的at-rule-no-unknown
    // 参考：https://github.com/kristerkari/stylelint-scss/issues/196
    'at-rule-no-unknown': null,
    // 强制@import、@include等行前有一行空行
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          // 允许非块内的同名at规则前不空行
          'blockless-after-same-name-blockless',
          // 允许最顶层的at规则前不空行
          'first-nested',
        ],
        ignore: [
          // 评论之后的at规则不受限制
          'after-comment',
        ],
        // if、else除外
        ignoreAtRules: ['if', 'else'],
      },
    ],
    // 强制@import等行的";"后必须换行
    'at-rule-semicolon-newline-after': 'always',
    // 强制"{" 后必须换行
    'block-opening-brace-newline-after': 'always',
    // 强制"}" 后必须换行
    'block-closing-brace-newline-after': [
      'always',
      {
        // if、else除外
        ignoreAtRules: ['if', 'else'],
      },
    ],
    // 允许最大空行数为1（之前为4但发现其实绝大多数场景下空行只有1行）
    'max-empty-lines': 1,
    // 禁止内容为空的规则、文件、style标签
    'no-empty-source': true,
    // 禁止使用tag选择器
    'selector-max-type': [
      0,
      {
        // 对page豁免
        ignoreTypes: ['page'],
      },
    ],
    // 禁止使用未知tag选择器（但对page豁免）
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],
    // 禁止颜色属性值为gray、lightgray颜色名
    'color-named': 'never',
    // 强制class选择器符合kebab-case
    // 参考https://stylelint.io/user-guide/faq
    'selector-class-pattern': [
      // 历史遗留问题，忽略iphoneX
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|iphoneX',
      {
        resolveNestedSelectors: true,
      },
    ],
    // 强制id选择器符合kebab-case
    'selector-id-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    /**
     * 配置csstools/use-nesting插件规则
     *
     * 禁止：.card .title {}
     * 推荐：.card { .title {} }
     */
    'csstools/use-nesting': 'always',
    /**
     * 配置csstree/validator插件规则
     *
     * 禁止非法属性值，比如position: flex;
     */
    'csstree/validator': {
      ignoreValue: 'px\\(\\d+\\)',
    },
    /**
     * 配置sh-waqar/declaration-use-variable插件规则
     *
     * 要求一些属性值必须使用变量，比如颜色、字号
     */
    'sh-waqar/declaration-use-variable': [
      [
        // 匹配background-color、color等的正则
        '/color/',
        // 历史问题，暂时对z-index不做要求
        // 'z-index',
        {
          // transparent等特殊值不受影响
          ignoreValues: [
            'transparent',
            'inherit',
            'unset',
            // 匹配函数
            '/regexForspecialFunc/',
          ],
        },
      ],
    ],
    /**
     * 配置scss插件规则
     *
     * stylelint-scss是stylelint官推的针对scss的扩展插件
     */
    // 启用scss插件的at-rule-no-unknown规则
    'scss/at-rule-no-unknown': true,
    // 禁止重复的变量定义
    'scss/no-duplicate-dollar-variables': true,
    // 禁止重复的mixin声明
    'scss/no-duplicate-mixins': true,
    // 强制数学计算（eg. $width * 3）操作符前后有空格
    'scss/operator-no-unspaced': true,
    // 强制数学计算操作符不换行
    'scss/operator-no-newline-after': true,
    // 强制双斜线注释后要有一个空格
    'scss/double-slash-comment-whitespace-inside': 'always',
  },
}
