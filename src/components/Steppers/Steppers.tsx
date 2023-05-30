import { View } from '@tarojs/components'
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import cx from 'classnames'

import { isNumber, warning } from '../../utils/common'

import {
  HuiSteppersProps,
  StepItem,
  prefix,
  stepActive,
  stepFixWidth,
  stepLive,
  stepNormal,
} from './constants'

import './Steppers.scss'

import HuiIcon from '../Icon'

/**
 * 步骤条
 * @example
 *  import Steps from "@/components/Steps";

    const StepsPage: React.FC = () => {
        return (
            <Steps
              items={[
                  {
                  title: "步骤名称",
                  description:'描述文字'
                  },
                  {
                  title: "步骤名称",
                  description:'描述文字'
                  },
                  {
                  title: "步骤名称",
                  description:'描述文字'
                  }
              ]}
            />
        );
    };
*/
const Steppers: React.FC<HuiSteppersProps> = (props) => {
  const {
    onChange,
    className,
    items = [],
    current = 1,
    disabled = false,
    showSlicedTitle = false,
  } = props
  const [cur, setCur] = useState(current)
  const list = useMemo(() => items.filter((e) => e), [items])
  const overflowAuto = useMemo(() => list.length > 4, [list])
  const stepsAutoStyle: CSSProperties | undefined = useMemo(
    () =>
      overflowAuto
        ? {
            overflowX: 'auto',
          }
        : undefined,
    [overflowAuto],
  )

  const stepAutoStyle: CSSProperties | undefined = useMemo(
    () =>
      overflowAuto
        ? {
            display: 'flex',
            width: stepFixWidth * list.length,
          }
        : undefined,
    [overflowAuto, list],
  )

  const onHandleChange = useCallback(
    (i: number, e: any) => {
      if (disabled) return
      setCur(i)
      onChange?.(i, e)
    },
    [disabled],
  )
  const computeClassName = useCallback(
    (i) => {
      if (i === cur) return stepLive
      if (i < cur) return stepActive
      return stepNormal
    },
    [cur],
  )

  const computeIconNode = useCallback(
    (i) => (i < cur ? <HuiIcon name='003-right' size={27} /> : i),
    [cur],
  )

  const updateCur = useCallback(() => {
    if (!isNumber(current)) {
      warning(`current类型错误： ${current}不是Number类型`)
      return
    }
    const listLength = list?.length
    if (current > listLength || current < 0) {
      setCur(current < 0 ? 0 : listLength)
      warning(`current边界异常： ${current}不在合理区间范围内`)
      return
    }
    setCur(current)
  }, [current, list])

  const renderItem = (e: StepItem, i: number) => {
    const {
      title,
      description,
      disabled: itemDisabled,
      showSlicedTitle: itemShowSlicedTitle = false,
    } = e
    const index = i + 1
    const autoStyle: CSSProperties = {
      width: overflowAuto ? stepFixWidth : 'auto',
      float: 'left',
    }
    const stepItemClassName = computeClassName(index)
    const stepItemIconNode = computeIconNode(index)
    let slicedTitle
    if (typeof title === 'string' && !itemShowSlicedTitle && !showSlicedTitle) {
      slicedTitle = title.slice(0, 5)
    } else {
      slicedTitle = title
    }
    return (
      <View
        className={`${prefix}-steps-step`}
        onClick={(event) => !itemDisabled && onHandleChange(index, event)}
        style={overflowAuto ? autoStyle : undefined}
      >
        <View
          className={cx(`${prefix}-steps-step-indicator `, stepItemClassName)}
        >
          <View
            className={cx(
              `${prefix}-steps-step-indicator-icon`,
              `${stepItemClassName}-icon`,
            )}
          >
            <View
              className={cx(
                `${prefix}-steps-step-indicator-icon-node`,
                `${stepItemClassName}-icon-node`,
              )}
            >
              {stepItemIconNode}
            </View>
          </View>
        </View>
        <View className={cx(`${prefix}-steps-step-content`, stepItemClassName)}>
          <View
            className={cx(
              `${prefix}-steps-step-title`,
              `${stepItemClassName}-title`,
            )}
          >
            {slicedTitle}
          </View>
          <View className={`${prefix}-steps-step-desc`}>{description}</View>
        </View>
      </View>
    )
  }

  useEffect(() => updateCur(), [current])

  return list.length ? (
    <View className={cx(prefix, className)} style={stepsAutoStyle}>
      <View className={`${prefix}-steps`} style={stepAutoStyle}>
        {list?.map((e, i) => renderItem(e, i))}
      </View>
    </View>
  ) : null
}

export default Steppers
