import { View, Text, Label } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import HuiIcon from '../../Icon/Icon'

import { useAnimationCss } from './animation'
import validatorField from './rules'

import Context, {
  HuiFormItemProps,
  formItemPrefix,
  FormItemContext,
  FieldContext,
  ItemType,
  NormalCss,
  FormListContextProps,
  FormListContext,
  AlignType,
} from '../constants'
import { toArray } from '../util'
import { useId } from '../../../utils/hooks'

/**
 * form表单基础组件
 */
const Item: React.FC<HuiFormItemProps> = (props) => {
  const context = useContext<FieldContext>(Context)
  const { registerWatch, getFieldValue, setFieldValue, removeFieldValue } =
    context
  const listContext = useContext<FormListContextProps>(FormListContext)
  const [renderType, setRenderType] = useState<keyof ItemType>('other')
  const [, update] = useState({})
  const [submitTotal, setSubmitTotal] = useState(0)
  const [ruleCss, setRuleCss] = useState<string>(NormalCss)
  const [ruleText, setRuleText] = useState<string>()

  const id = useId()

  const newProps = useRef<{
    onChange?: (event: any) => void
    value?: string
  }>({})

  const {
    name,
    label,
    children,
    className = '',
    style,
    visible = true,
    // desc,
    tipsText = '',
    labelStyle,
    rule,
    labelWrapProps = {},
    align = AlignType.ROW,
    customOptionalStyle = null,
    hiddenOptionalStyle = false,
    labelIconNode,
    onLabelIconClick,
    showArrow = false,
    extra = null,
    hidden = false,
  } = props

  const { Provider } = FormItemContext
  const [ruleTarget] = rule ?? []
  const { name: listName } = listContext

  const path = useMemo(() => {
    const nameArr = toArray(name)
    if (listName) nameArr.unshift(listName)
    return nameArr
  }, [name, listName])

  const requireIcon = useMemo(
    () =>
      !ruleTarget?.require && !hiddenOptionalStyle
        ? customOptionalStyle || (
            <Text className={`${formItemPrefix}-option`}>(选填)</Text>
          )
        : null,
    [ruleTarget?.require, hiddenOptionalStyle, customOptionalStyle],
  )

  const labelIcon = useMemo(
    () =>
      labelIconNode ? (
        <View onClick={onLabelIconClick}>{labelIconNode}</View>
      ) : null,
    [labelIconNode, onLabelIconClick],
  )

  const ruleErrorView = useMemo(
    () =>
      ruleText ? (
        <View className={`${formItemPrefix}-rule`}>{ruleText}</View>
      ) : null,
    [ruleText],
  )

  const tipsView = useMemo(
    () =>
      tipsText ? (
        <View className={`${formItemPrefix}-tips`}>{tipsText}</View>
      ) : null,
    [tipsText],
  )

  const localValue = getFieldValue(path)

  const onChange = useCallback(
    (event) => {
      setFieldValue(path, event?.detail?.value ?? event)
    },
    [path, setFieldValue],
  )

  const renderLabel = () => {
    if (typeof label === 'function') {
      return label(getFieldValue(path))
    }

    return label
  }

  const copyChildren = () => {
    if (React.isValidElement(children)) {
      if (!Object.prototype.hasOwnProperty.call(children.props, 'onChange')) {
        newProps.current.onChange = onChange
      } else {
        delete newProps.current.onChange
      }
      if (!Object.prototype.hasOwnProperty.call(children.props, 'value')) {
        newProps.current.value = localValue
      } else {
        delete newProps.current.value
      }
      return children && React.cloneElement(children as any, newProps.current)
    }
    return children
  }

  const [implementAnimation] = useAnimationCss(
    `${formItemPrefix}-animation`,
    !!ruleText,
  )

  const validatorRules = useCallback(
    async (value: string) => {
      try {
        const [css, text] = validatorField(
          rule,
          value,
          renderType,
          getFieldValue,
        )

        setRuleCss(css)
        setRuleText(text)
        return {
          state: !text,
          name: path,
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    [getFieldValue, path, renderType, rule],
  )

  useEffect(() => {
    validatorRules(localValue)
  }, [localValue])

  // 组件卸载后移出字段
  useEffect(() => () => removeFieldValue(path), [path, removeFieldValue])

  useEffect(() => {
    const unMount = registerWatch(id, {
      name: path,
      setSubmitTotal,
      validatorRules,
      onStoreChange: () => update({}),
    } as any)
    return () => {
      unMount()
    }
  }, [id, path, registerWatch, validatorRules])

  useEffect(() => {
    if (submitTotal) implementAnimation()
  }, [submitTotal, implementAnimation])

  if (!visible) return null
  return (
    <View
      className={classNames(formItemPrefix, {
        [`${formItemPrefix}-hidden`]: hidden,
      })}
    >
      <View
        className={classNames(`${formItemPrefix}-wrapper`, className, {
          [ruleCss]: renderType === 'other',
        })}
        style={{
          ...style,
        }}
      >
        <View
          className={classNames({
            [`${formItemPrefix}-row`]: align === AlignType.ROW,
            [`${formItemPrefix}-column`]: align === AlignType.COLUMN,
          })}
        >
          {label && (
            <View
              className={`${formItemPrefix}-text`}
              style={{
                ...labelStyle,
              }}
            >
              <View className={`${formItemPrefix}-text-label`}>
                {renderLabel()}
                {requireIcon}
                {labelIcon}
              </View>
            </View>
          )}
          <Label {...labelWrapProps} className={`${formItemPrefix}-content`}>
            <Provider
              value={{
                setRenderType,
              }}
            >
              {copyChildren()}
            </Provider>
          </Label>
          {/* 水平布局额外区域内容 */}
          <View className={`${formItemPrefix}-extra`}>
            <View>{extra}</View>
            {showArrow && (
              <View>
                <HuiIcon
                  className={`${formItemPrefix}-arrow`}
                  name='012-right'
                />
              </View>
            )}
          </View>
        </View>

        {ruleErrorView ?? tipsView}
      </View>
    </View>
  )
}

export default Item
