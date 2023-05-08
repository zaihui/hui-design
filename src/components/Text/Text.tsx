/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import cx from 'classnames'
import { Text } from '@tarojs/components'

import { pxTransform } from '../../utils'

export enum TextLevel {
  One = 'one',
  Two = 'two',
  Three = 'three',
  Four = 'four',
  Five = 'five',
  Six = 'six',
  Seven = 'seven',
  Eight = 'eight',
  Nine = 'nine',
}

export const TextFont = {
  [TextLevel.One]: {
    fontSize: 24,
    lineHeight: 34,
  },
  [TextLevel.Two]: {
    fontSize: 20,
    lineHeight: 28,
  },
  [TextLevel.Three]: {
    fontSize: 18,
    lineHeight: 25,
  },
  [TextLevel.Four]: {
    fontSize: 16,
    lineHeight: 22,
  },
  [TextLevel.Five]: {
    fontSize: 14,
    lineHeight: 20,
  },
  [TextLevel.Six]: {
    fontSize: 13,
    lineHeight: 18,
  },
  [TextLevel.Seven]: {
    fontSize: 12,
    lineHeight: 17,
  },
  [TextLevel.Eight]: {
    fontSize: 11,
    lineHeight: 15,
  },
  [TextLevel.Nine]: {
    fontSize: 9,
    lineHeight: 13,
  },
}

export interface HuiTextProps {
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  textLevel?: TextLevel
}

const HuiText: React.FC<HuiTextProps> = props => {
  const {
    style = {},
    className = '',
    children,
    textLevel = TextLevel.Five,
  } = props

  if (!children && children !== 0) {
    return null
  }

  return (
    <Text
      style={{
        fontSize: pxTransform(TextFont[textLevel].fontSize),
        lineHeight: pxTransform(TextFont[textLevel].lineHeight),
        ...style,
      }}
      className={cx('hui-text', className)}
    >
      {children}
    </Text>
  )
}

export default HuiText
