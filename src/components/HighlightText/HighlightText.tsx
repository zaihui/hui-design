import { View, Text } from '@tarojs/components'
import React, { Children, CSSProperties, useCallback, useMemo } from 'react'

export interface HighlightTextProps {
  className?: string
  keyword: string
  keywordStyle?: CSSProperties
  children: React.ReactNode
}

const defaultHighLightTextColor = '#1577FC'

const HighlightText: React.FC<HighlightTextProps> = ({
  className,
  children,
  keyword,
  keywordStyle,
}) => {
  const highLightText = useCallback(
    (text: string) => {
      const reg = new RegExp(keyword, 'g')
      const keywordSplitText = text.split(reg)
      const matchText = text.match(reg)
      return keywordSplitText.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index !== keywordSplitText.length - 1 && (
            <Text style={keywordStyle ?? { color: defaultHighLightTextColor }}>
              {matchText?.[index]}
            </Text>
          )}
        </React.Fragment>
      ))
    },
    [keyword, keywordStyle],
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
          item.props.children = children.map((node) => HightLightStyleToKeyword(node))
        }
        return item
      })
    }
    return HightLightStyleToKeyword(children)
  }, [children, highLightText])

  return <View className={`${className ?? ''}`}>{highlightTextNode}</View>
}

export default HighlightText
