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
        const list = lowerText.split(lowerKeyword)

        /**
         * 思路
         * 因为将关键字、匹配文本全部转小写了，因此这里需要在原本的匹配文本上进行截取
         */
        for (let i = 0; i < list.length; i++) {
          const currLen = list[i].length
          const currIndex =
            matchText.length * keyword.length + unmatchText.join('').length
          const nextIndex = currIndex + currLen

          if (list[i]) {
            unmatchText.push(text.substring(currIndex, nextIndex))
            matchText.push(
              text.substring(nextIndex, nextIndex + keyword.length),
            )
          } else {
            matchText.push(
              text.substring(currIndex, currIndex + keyword.length),
            )
          }
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
