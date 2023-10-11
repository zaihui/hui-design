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
      const regexKeyWord = new RegExp(keyword, ignoreCase ? 'ig' : '')

      const keywordSplitText = text.split(regexKeyWord)
      const keywordList = text.match(regexKeyWord)

      return keywordSplitText.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index !== keywordSplitText.length - 1 && keywordList && (
            <Text style={keywordStyle ?? { color: defaultHighLightTextColor }}>
              {keywordList?.[index]}
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
