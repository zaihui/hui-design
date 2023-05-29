import { View } from '@tarojs/components'
import cx from 'classnames'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useBoundingClientRect } from '../../utils/hooks'
import HuiIcon from '../Icon'
import HuiText from '../Text/Text'

export interface CollapsePanelProps {
  title?: string
  name: string // separate multiple CollapsePanel
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

const CollapsePanel: React.FC<CollapsePanelProps> = props => {
  const {
    title = '折叠面板',
    name = 'collapse-panel',
    active = true,
    disabled = false,
    expandText = null,
    expandIcon = <HuiIcon name='h011-downward' />,
    className = '',
    style = {},
    children,
  } = props
  const panelChildRef = useRef()
  const panelChildRect = useBoundingClientRect(panelChildRef)

  const [visible, setVisible] = useState<boolean>(active)
  const [height, setHeight] = useState<number>(
    active ? panelChildRect?.height || 100 : 0,
  )

  const childClassName = useMemo(() => `${prefix}-child-${name}`, [name])

  useEffect(() => {
    if (visible) {
      if (panelChildRect) {
        setHeight(panelChildRect?.height ?? 0)
      }
    } else {
      setHeight(0)
    }
  }, [visible, panelChildRect, children])

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
