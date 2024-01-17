#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const program = require('commander')

program
  .version('1.0.0')
  .description('Copy files by extensions')
  .arguments('<srcDir> <destDir> [fileExtensions...]')
  .action((srcDir, destDir, fileExtensions) => {
    copyFilesByExtensions(srcDir, destDir, fileExtensions)
  })

program.parse(process.argv)

function copyFilesByExtensions(srcDir, destDir, fileExtensions) {
  // 创建目标目录
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  // 遍历文件类型数组
  fileExtensions.forEach((fileExtension) => {
    // 使用glob模块匹配指定后缀的文件
    const filePattern = path.join(srcDir, '**', `*.${fileExtension}`)
    const files = glob.sync(filePattern, { nodir: true, dot: true })

    // 复制文件
    files.forEach((file) => {
      const destFile = path.join(destDir, path.relative(srcDir, file))

      // 创建目标文件的目录
      const destFileDir = path.dirname(destFile)
      if (!fs.existsSync(destFileDir)) {
        fs.mkdirSync(destFileDir, { recursive: true })
      }

      fs.copyFileSync(file, destFile)
    })

    console.log(`Successfully copied ${files.length} ${fileExtension} files.`)
  })
}
