// 把color.scss中的颜色处理为可以直接用于展示的列表

// eslint-disable-next-line import/no-extraneous-dependencies
const sass = require('node-sass')

// 把一行上的颜色提取出来
const dealDeclaration = (d) => {
  const [name, value] = d.replace(';', '').split(':')
  return {
    name: name.trim(),
    value: value.trim(),
  }
}

// 把一行分为三部分，冒号前的是变量名，冒号后分号前的是变量值，两个斜线后的是注释
const dealLine = (line = '') => {
  const commentIndex = line.lastIndexOf('//')
  const usage = commentIndex > 0 ? line.slice(commentIndex + 2).trim() : ''

  const lineOmitComment = line.slice(0, commentIndex > 0 ? commentIndex : line.length)
  return {
    usage,
    ...dealDeclaration(lineOmitComment),
  }
}

const dealBlock = (titleStr, contentStr) => {
  // 每个块中的第一行是标题，后面的内容是颜色列表
  const title = titleStr.replace('/**', '').replace('**/', '').trim()
  const colors = contentStr
    .split('\n')
    // 去掉行首行位的空格
    .map((_) => _.trim())
    // 忽略空行
    .filter((_) => !!_)
    .map(dealLine)
  return {
    title,
    colors,
  }
}

// 匹配/** 类别名 **/格式的注释
const blockTokenReg = /(^\/[*]{2} .+ [*]{2}\/$)[.|\n]+/gm

const genSemiFinishedBlocks = (content) => {
  // 把scss文件按照注释分块
  const blocks = content.split(blockTokenReg).slice(1)

  const results = []
  for (let i = 0; i < blocks.length; i++) {
    results.push(dealBlock(blocks[i], blocks[++i]))
  }
  return results
}

// 利用node-sass把scss文件中的变量编译
const getVarValues = (scssContent, varList) => {
  const propsOfVars = varList.map(({ name }) => `${name.slice(1)}: ${name};`).join('\n')

  const renderInputData = `
      ${scssContent}
      #selector-for-render {
        ${propsOfVars}
      }
    `
  const css = sass
    .renderSync({
      data: renderInputData,
    })
    .css.toString()

  // 渲染结果中去掉选择器等无关内容
  const cssProsp = css
    .replace('@charset "UTF-8";', '')
    .replace(/#selector-for-render \{\n/, '')
    .replace(/\}[\n| ]*$/, '')
    .replace(/^\/\*\*.*\*\*\/$/gm, '')

  const varValueList = cssProsp
    .split('\n')
    .map((_) => _.trim())
    .filter((_) => !!_)
    .map(dealDeclaration)

  // reduce得到一个由变量名和真正的变量值构成的map
  return varValueList.reduce(
    (acc, item) => ({
      ...acc,
      [`$${item.name}`]: item.value,
    }),
    {},
  )
}

const genPalette = (content) => {
  // 首先把scss文件分块，但这时获得的变量值还是scss中的原格式，存在rgba($theme-primary, .5)等写法
  const semiFinishedBlocks = genSemiFinishedBlocks(content)

  // 把所有的变量提取为一个列表
  const allVarsInScssList = semiFinishedBlocks.reduce((acc, block) => [...acc, ...block.colors], [])

  // 利用所有的变量生成一个css文件调用sass渲染一遍生成浏览器可以处理的css格式
  const varValueMap = getVarValues(content, allVarsInScssList)

  // 把之前scss分块得到的结果中的变量替换为sass处理后的值
  semiFinishedBlocks.forEach((block) => {
    block.colors.forEach((item) => {
      item.value = varValueMap[item.name]
    })
  })

  return semiFinishedBlocks
}

module.exports = function (content) {
  return `module.exports = ${JSON.stringify(genPalette(content))}`
}
