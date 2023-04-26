/**
 * 参考：https://commitlint.js.org/#/reference-rules
 * 使用@commitlint/config-conventional：https://www.npmjs.com/package/@commitlint/config-conventional
 * 支持如下type：
 * 'build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 关闭对subject的case要求，这个不符合我们习惯
    'subject-case': [0],
  },
}
