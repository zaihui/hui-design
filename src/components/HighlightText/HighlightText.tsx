import { View, Text } from '@tarojs/components'
import React, { Children, CSSProperties, useCallback, useMemo } from 'react'

export interface HighlightTextProps {
  className?: string
  keyword: string
  /** 是否忽略大小写，默认为 false */
  ignoreCase?: boolean
  keywordStyle?: CSSProperties
  children: React.ReactNode
}
const defaultHighLightTextColor = '#1577FC'

const HighlightText: React.FC<HighlightTextProps> = ({
  className,
  children,
  keyword,
  keywordStyle,
  ignoreCase = false,
}) => {
  // 转义输入搜索项时触发正则表达式中的特殊字符
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const highLightText = useCallback(
    (text: string) => {
      if (typeof keyword !== 'string') return text

      if (!keyword?.length) return text

      const keywordResult = escapeRegExp(keyword)

      // 匹配规则
      const regex = new RegExp(keywordResult, ignoreCase ? 'gi' : 'g')

      // 匹配到的结果分割
      const replaceResultArr = text
        ?.replace(regex, (matchStr) => `%%${matchStr}%%`)
        ?.split('%%')
        ?.filter((item) => item !== '')

      const renderHighlightText = (highlightText: string) => (
        <Text style={keywordStyle ?? { color: defaultHighLightTextColor }}>
          {highlightText}
        </Text>
      )

      return replaceResultArr.map((str, index) => {
        // 忽略大小写
        if (ignoreCase && keyword?.toLowerCase() === str?.toLowerCase()) {
          return renderHighlightText(str)
        }

        // 不忽略大小写
        if (keyword === str) {
          return renderHighlightText(str)
        }
        // 必须包一层标签，要不就有 bug ！！！
        return <Text key={index}>{str}</Text>
      })
    },
    [ignoreCase, keyword, keywordStyle],
  )

  const highlightTextNode = useMemo(() => {
    function HightLightStyleToKeyword(reactNode) {
      return Children.map(reactNode, (item) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { children } = item?.props ?? {}
        if (typeof item === 'string') {
          item = highLightText(item)
        }
        if (children && typeof children === 'string') {
          item.props.children = highLightText(children)
        }
        if (children && Array.isArray(children)) {
          item.props.children = children.map((node) =>
            HightLightStyleToKeyword(node),
          )
        }
        return item
      })
    }
    return HightLightStyleToKeyword(children)
  }, [children, highLightText])

  return (
    <View className={`${className ?? ''}`}>
      {typeof keyword !== 'string' ? children : highlightTextNode}
    </View>
  )
}

export default HighlightText
