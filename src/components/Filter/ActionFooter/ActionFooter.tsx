import React, { FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import HuiButton, { HuiButtonProps } from '../../Button/Button'
import './ActionFooter.scss'

export interface ActionFooterProps {
  /** 确认按钮文字 */
  confirmText?: ReactNode
  /** 清空筛选项文字 */
  clearText?: ReactNode
  /** 点击确定回调 */
  onConfirm?: (e: ITouchEvent) => void
  /** 点击重置回调 */
  onClear?: (e: ITouchEvent) => void
  /** 确认按钮的props */
  confirmButtonProps?: HuiButtonProps
  /** 清空筛选项按钮的props */
  clearButtonProps?: HuiButtonProps
  /** 点击confirm后隐藏菜单 */
  hideMenu: () => void
}

const ActionFooter: FC<ActionFooterProps> = props => {
  const { confirmButtonProps, clearButtonProps, confirmText, clearText } = props

  const handleClear = (e: ITouchEvent) => {
    props.onClear && props.onClear(e)
  }

  const handleOk = (e: ITouchEvent) => {
    props.onConfirm && props.onConfirm(e)
    props.hideMenu()
  }

  return <View className='hui-filter-action-footer'>
  <HuiButton
    className='hui-filter-action-footer-clear'
    type='secondary'
    radiusType='square'
    onClick={handleClear}
    {...clearButtonProps}
  >
    {clearText || '清空筛选项'}
  </HuiButton>
  <HuiButton
    className='hui-filter-action-footer-confirm'
    radiusType='square'
    onClick={handleOk}
    {...confirmButtonProps}
  >
    {confirmText || '筛选'}
  </HuiButton>
</View>
}

export default ActionFooter
