import fs from 'fs'
import path from 'path'

const versionType = {
  major: 'major',
  minor: 'minor',
  patch: 'patch',
  beta: 'beta',
}

// 获取 npm 的环境变量
const versionTypeValue = process.env.npm_config_setVersion

function updateVersion() {
  try {
    // 读取 package.json
    const packagePath = path.resolve('./package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

    let parts = packageJson.version?.split('-')
    // 主版本号
    let mainParts = parts[0].split('.')
    // 测试版本号
    let prereleaseParts = parts[1] ? parts[1]?.split('.') : []

    // 判断是不是测试版本，版本号存不存在 -
    switch (versionTypeValue) {
      case versionType.beta:
        let prereleaseVersion = parseInt(
          prereleaseParts?.[prereleaseParts.length - 1] || 0,
        )
        ++prereleaseVersion
        packageJson.version = `${mainParts.join('.')}-${
          versionType.beta
        }.${prereleaseVersion}`
        break
      case versionType.patch:
        mainParts[2] = mainParts[2] ? ++mainParts[2] : 1
        packageJson.version = mainParts.join('.')
        console.log(mainParts, packageJson.version, 'mainParts')
        break

      case versionType.minor:
        mainParts[1] = mainParts[1] ? ++mainParts[1] : 1
        packageJson.version = mainParts.join('.')
        break

      case versionType.major:
        mainParts[0] = mainParts[0] ? ++mainParts[0] : 1
        packageJson.version = mainParts.join('.')
        break

      default:
        packageJson.version = packageJson.version
        break
    }
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
  } catch (error) {
    console.info(
      '请使用以下正则表达式来验证版本号格式：/^(\\d+\\.\\d+\\.\\d+(-beta\\.\\d+)?)$/',
    )
    console.error('Error Message = ' + error)
    process.exit(1)
  }
}

updateVersion()
