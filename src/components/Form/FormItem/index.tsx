import { View, Text, Label } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

/**
 * form表单基础组件
 */
const Item: React.FC<HuiFormItemProps> = (props) => {
  const context = useContext<FieldContext>(Context)
  const { registerWatch, getFieldValue, setFieldValue } = context
  const listContext = useContext<FormListContextProps>(FormListContext)
  const [renderType, setRenderType] = useState<keyof ItemType>('other')
  const [total, setTotal] = useState(0)
  const [submitTotal, setSubmitTotal] = useState(0)
  const [ruleCss, setRuleCss] = useState<string>(NormalCss)
  const [ruleText, setRuleText] = useState<string>()

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
    rule = [],
    align = AlignType.ROW,
    customOptionalStyle = null,
    hiddenOptionalStyle = false,
    labelIconNode,
    onLabelIconClick,
    showArrow = false,
    extra = null,
  } = props

  const { Provider } = FormItemContext
  const [ruleTarget = {}] = rule
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

  const copyChildren = useMemo(
    () => {
      if (React.isValidElement(children)) {
        const newProps: {
          onChange?: (event: any) => void
          value?: string
        } = {}
        if (!children.props.onChange) {
          newProps.onChange = (event) => {
            setFieldValue(path, event?.detail?.value ?? event)
          }
        }
        if (children.props.value === undefined) {
          newProps.value = getFieldValue(path)
        }
        return children && React.cloneElement(children as any, newProps)
      }
      return children
    },
    // total是为了值变化手动刷新子组件
    [total, getFieldValue, path, children, setFieldValue],
  )

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
    [rule, renderType, path, getFieldValue],
  )

  useEffect(() => {
    validatorRules(getFieldValue(path))
  }, [getFieldValue, path, validatorRules])

  useEffect(() => {
    const unMount = registerWatch({
      name: path,
      setSubmitTotal,
      validatorRules,
      onStoreChange: () => setTotal((pre) => pre + 1),
    } as any)
    return () => {
      unMount()
    }
  }, [renderType, path, rule, registerWatch, validatorRules])

  useEffect(() => {
    if (submitTotal) implementAnimation()
  }, [submitTotal, implementAnimation])

  if (!visible) return null
  return (
    <View className={classNames(formItemPrefix)}>
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
                {label}
                {requireIcon}
                {labelIcon}
              </View>
            </View>
          )}
          <Label className={`${formItemPrefix}-content`}>
            <Provider
              value={{
                setRenderType,
              }}
            >
              {copyChildren}
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
