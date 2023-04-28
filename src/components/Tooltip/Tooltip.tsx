import React from 'react'
import { View } from '@tarojs/components'

import HuiIcon from '../Icon/Icon'
import './Tooltip.scss'

export interface HuiTooltipProps {
  /** 气泡文字 */
  content: string
  /** 是否显示 */
  visible: boolean
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 包裹传入组件的父元素样式 */
  containerStyle?: React.CSSProperties
  /** 气泡长方形自定义样式 */
  popStyle?: React.CSSProperties
  /** 倒计时时长，默认1000ms */
  duration?: number
  className?: string
  children?: React.ReactNode
  /** 关闭提示的方法 */
  onClose: () => void
  /** 气泡位置，默认top */
  placement?: | 'top'
    | 'topRight'
    | 'topLeft'
    | 'bottom'
    | 'bottomRight'
    | 'bottomLeft'
    | 'left'
    | 'right'
}

const placementCls = {
  top: 'top',
  topRight: 'top-right',
  topLeft: 'top-left',
  bottom: 'bottom',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
  left: 'left',
  right: 'right',
}

export default class Tooltip extends React.Component<HuiTooltipProps> {
  static defaultProps = {
    duration: 1000,
    visible: false,
    placement: 'top',
  }

  componentWillReceiveProps(nextProps: HuiTooltipProps): void {
    const { visible } = nextProps
    const { closable } = this.props
    if (visible === this.props.visible) return
    if (!visible) {
      this.close()
      return
    }
    if (closable) return

    this.restartTimer()
  }

  timer: NodeJS.Timeout | null = null

  close(): void {
    const { onClose } = this.props
    onClose && onClose()
    this.clearTimer()
  }

  clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  makeTimer(duration: number): void {
    if (duration === 0) return
    this.timer = setTimeout(() => {
      this.close()
    }, duration)
  }

  handleClose = (): void => {
    const { onClose } = this.props
    onClose && onClose()
  }

  restartTimer = (): void => {
    const { duration } = this.props
    this.clearTimer()
    this.makeTimer(duration || 0)
  }

  render(): JSX.Element {
    const {
      children,
      content,
      placement = 'top',
      containerStyle,
      popStyle,
      visible,
      closable,
      className = '',
    } = this.props

    return (
      <View className={`hui-tooltip-container ${className}`} style={containerStyle}>
        {children}
        {visible && <View className={`hui-tooltip ${placementCls[placement]}`} style={popStyle}>
          <View className='hui-tooltip-content'>{content}</View>
          <View className='hui-tooltip-arrow'></View>
          {closable && <View className='hui-tooltip-close' onClick={this.handleClose}>
            <HuiIcon name='006-close3' color='#fff' size={10} />
          </View>}
        </View>}
      </View>
    )
  }
}
