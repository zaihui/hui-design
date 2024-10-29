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
  const highLightText = useCallback(
    (text: string) => {
      if (typeof keyword !== 'string') return text
      let unmatchText: string[] = []
      const matchText: string[] = []
      if (ignoreCase) {
        const lowerText = text.toLowerCase()
        const lowerKeyword = keyword.toLowerCase()

        let startIndex = 0

        for (let i = 0; i < lowerText.length; i++) {
          if (
            lowerText.substring(i, i + lowerKeyword.length) === lowerKeyword
          ) {
            if (i >= startIndex) {
              unmatchText.push(text.substring(startIndex, i))
            }

            matchText.push(text.substring(i, i + lowerKeyword.length))

            startIndex = i + lowerKeyword.length
          }
        }

        if (startIndex < text.length) {
          unmatchText.push(text.substring(startIndex))
        }

        // 解决 keyword 在结尾的情况
        if (unmatchText.length === matchText.length) {
          unmatchText.push('')
        }
      } else {
        unmatchText = text.split(keyword)
      }

      return unmatchText.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index !== unmatchText.length - 1 && (
            <Text style={keywordStyle ?? { color: defaultHighLightTextColor }}>
              {ignoreCase ? matchText[index] : keyword}
            </Text>
          )}
        </React.Fragment>
      ))
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
