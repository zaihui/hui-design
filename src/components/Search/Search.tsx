import { ITouchEvent, View } from '@tarojs/components'
import cx from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { ViewProps } from '@tarojs/components/types/View'
import HuiInput, { HuiInputProps } from '../Input'
import HuiIcon from '../Icon'
import HuiButton from '../Button/Button'

import './Search.scss'

export interface HuiSearchProps extends ViewProps, Omit<HuiInputProps, 'onInput'> {
  searchText?: string
  /** 是否显示搜索icon */
  searchIcon?: boolean
  /** 是否显示清除icon */
  clearIcon?: boolean
  /** 两种主题 */
  theme?: 'dark' | 'light'
  style?: React.CSSProperties
  className?: string
  onClear?: () => void
  onInput?: (val: string) => void
  onSearch?: (val: string, e: ITouchEvent) => void
}

const prefix = 'hui-search'
// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = () => {}
const Search: React.FC<HuiSearchProps> = props => {
  const {
    searchText,
    searchIcon = true,
    clearIcon = true,
    onlyClick,
    className = '',
    style,
    onInput = empty,
    onClear,
    onClick,
    onSearch,
    theme = 'light',
  } = props
  const [val, setVal] = useState('')
  const allowClear = useMemo(() => clearIcon && props.value, [clearIcon, props.value])

  const searchBg = useMemo<React.CSSProperties>(() => {
    let bgColor = '#fff'

    if (theme === 'dark') {
      bgColor = '#1e1e1e0d'
    }

    return { backgroundColor: bgColor }
  }, [theme])

  useEffect(() => {
    setVal(props.value || '')
  }, [props.value])

  return (
    <View
      style={style}
      className={`${prefix} ${className}`}
      onClick={e => {
        if (onlyClick && onClick) {
          onClick(e)
        }
      }}
    >
      <View className={cx(`${prefix}-content`)} style={searchBg}>
        {searchIcon ? (
          <View className={cx(`${prefix}-search-icon search`)}>
            <HuiIcon name='015-searchcircle' color='#a4a4a4ff' size={16} style={{ display: 'block' }} />
          </View>
        ) : null}
        <View className={cx(`${prefix}-input-box`, { 'small-gap': allowClear, 'search-icon': searchIcon })}>
          <HuiInput
            {...props}
            style={{ padding: 0, height: '100%', background: 'transparent' }}
            value={val}
            onInput={({
              detail: {
                value,
              },
            }) => {
              onInput(value)
            }}
          />
        </View>
        {allowClear ? (
          <View
            className={cx(`${prefix}-search-icon clear`)}
            onClick={() => {
              onInput('')
              if (onClear) {
                onClear()
              }
            }}
          >
            <HuiIcon name='005-close2' color='#1e1e1e40' size={16} style={{ display: 'block' }} />
          </View>
        ) : null}
      </View>
      {searchText ? (
        <View
          className={cx(`${prefix}-search-text`)}
          onClick={e => {
            if (onSearch) {
              onSearch(val, e)
            }
          }}
        >
          <HuiButton
            type='text'
            size='small'
            radiusType='square'
          >{searchText}</HuiButton>
        </View>
      ) : null}
    </View>
  )
}

export default Search
