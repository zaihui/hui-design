import React from 'react'
import { View } from '@tarojs/components'

import {
  UseHandleModalPromise,
  useHandleModalPromise,
} from '../../hook/useModal'
import HuiToast, { HuiToastProps } from '../Toast'
import { HIconType } from '../Icon/type'

/** 调用 toast 需要传的参数 */
export type UseToastProps = Omit<HuiToastProps, 'visible' | 'icon'> & {
  icon?: HIconType
}

/** useModel 整合后的数据 */
interface ToastProps {
  config: UseToastProps
  visible: boolean
  onClose: () => void
}

const classPrefix = 'h-toast'
const UseToast = (props: ToastProps): React.ReactElement | boolean => {
  const { config = {}, visible, onClose } = props
  const {
    icon,
    iconColor,
    title,
    type,
    duration,
    align,
    success,
    customIcon,
    mask,
  } = config as UseToastProps

  const handleSuccess = () => {
    onClose()
    success && success()
  }
  return (
    <View className={classPrefix}>
      <HuiToast
        type={type}
        title={title}
        icon={icon}
        iconColor={iconColor}
        duration={duration}
        align={align}
        mask={mask}
        customIcon={customIcon}
        visible={visible}
        success={handleSuccess}
      />
    </View>
  )
}

/**
 *
 * todo: 使用方式
 *
 * import { useToast } from '@/components/HToast'
 *import { type } from '../Badge/index';
import { HIconType } from '@/components/Icon/type';

 * const {node: Toast, show: showToast } = useToast()
 *
 * {Toast} 挂载在组件上
 *
 * showToast({ title: '测试' }) 方法内调用即可
 */
export const useToast = (
  props?: object,
): UseHandleModalPromise<UseToastProps> =>
  useHandleModalPromise(UseToast as React.FC, {
    value: 'config',
    props,
  })
