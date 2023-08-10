import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import cx from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import HuiIcon from '../Icon'
import HuiText from '../Text/Text'

export interface CollapsePanelProps {
  title?: string
  name?: string | number // separate multiple CollapsePanel
  active?: boolean
  disabled?: boolean
  className?: string
  expandText?: string | ((visible: boolean) => React.ReactNode)
  expandIcon?: React.ReactNode | ((visible: boolean) => React.ReactNode)
  style?: React.CSSProperties
  children?: React.ReactNode
}

const defaultChildPadding = 16
const prefix = 'hui-collapse'

const CollapsePanel: React.FC<CollapsePanelProps> = (props) => {
  const {
    title = '折叠面板',
    name = Date.now(),
    active = true,
    disabled = false,
    expandText = null,
    expandIcon = <HuiIcon name='h011-downward' />,
    className = '',
    style = {},
    children,
  } = props
  const panelChildRef = useRef()

  const [visible, setVisible] = useState<boolean>(active)
  const [height, setHeight] = useState<number>(active ? 100 : 0)

  const childClassName = useMemo(() => `${prefix}-child-${name}`, [name])

  const getHeight = useCallback(() => {
    const query = Taro.createSelectorQuery()
    if (!childClassName) {
      throw new Error('传入的Taro.TaroElement对象需要有className')
    }
    query
      .select(`.${childClassName}`)
      .fields(
        {
          size: true,
          computedStyle: ['height', 'padding'],
          context: true,
        },
        (res) => {
          const resHeight = res?.height?.replace('px', '')
          const resPadding = res?.padding?.replace('px', '')
          setHeight(res?.height ? +resHeight + +resPadding * 2 : 100)
        },
      )
      .exec()
  }, [childClassName, visible])

  useEffect(() => {
    if (visible) {
      Taro.nextTick(() => getHeight())
    } else {
      setHeight(0)
    }
  }, [visible, childClassName])

  const panel = useMemo(
    () => (
      <View
        className={cx(`${prefix}-child`, {
          [`${prefix}-child-active`]: visible,
        })}
        style={{
          height,
        }}
      >
        <View
          ref={panelChildRef}
          className={cx(`${childClassName}`, {
            [`${className}`]: Boolean(className),
          })}
          style={{ padding: defaultChildPadding, ...style }}
        >
          {children}
        </View>
      </View>
    ),
    [height, children, className, style, childClassName, visible],
  )

  const text = useMemo(() => {
    if (typeof expandText === 'function') {
      return <HuiText>{expandText(visible)}</HuiText>
    }
    return <HuiText>{expandText ?? (!visible ? '展开' : '收起')}</HuiText>
  }, [visible, expandText])

  const collapseIcon = useMemo(() => {
    if (typeof expandIcon === 'function') {
      return <View className='icon'>{expandIcon(visible)}</View>
    }
    return (
      <View
        className={cx('icon', {
          upward: visible,
          downward: !visible,
        })}
      >
        {expandIcon}
      </View>
    )
  }, [visible, expandIcon])

  return (
    <View className={`${prefix}`}>
      <View
        className={cx(`${prefix}-header`, {
          [`${prefix}-header-disabled`]: disabled,
        })}
        onClick={() => {
          if (disabled) return
          setVisible(!visible)
        }}
      >
        <HuiText className={`${prefix}-header-title`}>{title}</HuiText>
        <View className={`${prefix}-header-toggle`}>
          {text}
          {collapseIcon}
        </View>
      </View>
      {panel}
    </View>
  )
}

export default CollapsePanel
