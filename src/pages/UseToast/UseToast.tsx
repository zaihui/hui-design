import React from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import useHuiToast from '@/components/UseToast'

import './UseToast.scss'

const ToastPage: React.FC = () => {
  const { node: toast, show: showToast } = useHuiToast()

  return (
    <View className='toast-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-25/hui-design-toast-21052501.png'
        title='轻提示UseToast(new)'
        desc='用于用户操作后的轻量提示，可自定义展示时间、展示icon、是否有透明遮罩等'
      />

      <View className='content'>
        <GroupSection title='提示类型'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '只有文本内容',
                  type: 'text',
                })
              }
            >
              纯文本提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '最多展示十五个字最多展示十五个字最多展示十五个字',
                  type: 'text',
                })
              }
            >
              多行文本提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '横向提示',
                  type: 'success',
                  iconColor: '#28a745',
                  align: 'row',
                })
              }
            >
              横向提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '警告提示',
                  type: 'warning',
                  iconColor: '#ffc107',
                })
              }
            >
              警告提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '失败提示',
                  type: 'fail',
                  iconColor: '#f44336',
                })
              }
            >
              失败提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '成功提示',
                  type: 'success',
                  iconColor: '#28a745',
                })
              }
            >
              成功提示
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '使用IconFont的图标',
                  type: 'custom',
                  icon: '007-qrcode',
                })
              }
            >
              使用IconFont的图标
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() =>
                showToast({
                  title: '自定义提示内容',
                  type: 'custom',
                  customIcon: <View>自定义内容，想什么样就什么样</View>,
                })
              }
            >
              自定义提示内容
            </HuiButton>
          </View>
        </GroupSection>
      </View>
      {toast}
    </View>
  )
}

export default ToastPage
