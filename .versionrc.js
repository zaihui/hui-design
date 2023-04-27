/**
 * standard-version的配置
 *
 * 参见：https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md
 */

const { homepage: repositoriesUrl } = require('./package.json')

const getUrlFormat = hash => `${repositoriesUrl}${hash}`

module.exports = {
  header: '# CHANGELOG',
  releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
  commitUrlFormat: getUrlFormat('/commit/{{hash}}'),
  compareUrlFormat: getUrlFormat(`/compare/{{previousTag}}...{{currentTag}}`)
}
