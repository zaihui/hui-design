import React, { useState } from 'react'
import { View } from '@tarojs/components'

import Toast from '@/components/Toast'
import HuiButton from '@/components/Button'
import { HIconType } from '@/components/Icon/type'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './ToastPage.scss'

enum ToastTypeEnum {
  SUCCESS = 'success',
  FAIL = 'fail',
  WARNING = 'warning',
  TEXT = 'text',
  CUSTOM = 'custom'
}
interface ToastData {
  title: string
  mask?: boolean
  type: ToastTypeEnum
  visible: boolean
  duration?: number
  icon?: HIconType
}

const ToastPage: React.FC = () => {
  const [toastData, setToastData] = useState<ToastData>({
    title: 'Default Text',
    mask: false,
    type: ToastTypeEnum.TEXT,
    visible: false,
    duration: 1500,
  })

  const handleShowToast = (data: ToastData) => {
    setToastData(data)
  }

  const { title, mask, type, visible, duration, icon } = toastData

  return (
    <View className='toast-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-25/hui-design-toast-21052501.png'
        title='轻提示Toast'
        desc='用于用户操作后的轻量提示，可自定义展示时间、展示icon、是否有透明遮罩等'
      />

      <View className='content'>
        <GroupSection title='提示类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => handleShowToast({
                title: '单行纯文本',
                mask: false,
                visible: true,
                type: ToastTypeEnum.TEXT,
              })}
            >
              单行纯文本提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => handleShowToast({
                title: '最多十四个字最多十四个字最多是',
                mask: false,
                visible: true,
                type: ToastTypeEnum.TEXT,
              })}
            >
              多行纯文本提示
            </HuiButton>
            </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => handleShowToast({
                title: '成功提示',
                mask: false,
                visible: true,
                type: ToastTypeEnum.SUCCESS,
              })}
            >
              成功提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => handleShowToast({
                title: '警示信息',
                mask: false,
                visible: true,
                type: ToastTypeEnum.WARNING,
              })}
            >
              警示信息
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => handleShowToast({
                title: '失败提示',
                mask: false,
                visible: true,
                type: ToastTypeEnum.FAIL,
              })}
            >
              失败提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => handleShowToast({
                title: '自定义提示',
                mask: false,
                visible: true,
                type: ToastTypeEnum.CUSTOM,
                icon: '008-likecircle',
              })}
            >
              自定义提示
            </HuiButton>
          </View>
        </GroupSection>
      </View>
      <Toast
        title={title}
        mask={mask}
        type={type}
        visible={visible}
        duration={duration}
        icon={icon}
      />
    </View>
  )
}

export default ToastPage
