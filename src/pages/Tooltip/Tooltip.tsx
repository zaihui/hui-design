import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import HuiTooltip from '@/components/Tooltip'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Tooltip.scss'

const TooltipPage: React.FC = () => {
  const [showTopLeft, setShowTopLeft] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [showTopRight, setShowTopRight] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const [showEllipsis, setShowEllipsis] = useState(false)
  const [showBottomLeft, setShowBottomLeft] = useState(false)
  const [showBottom, setShowBottom] = useState(false)
  const [showBottomRight, setShowBottomRight] = useState(false)
  const [showAutoClose, setShowAutoClose] = useState(false)
  const [showClosable, setShowClosable] = useState(false)

  return (
    <View className='tooltip-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-27/hui-design-tooltip-21052701.png'
        title='文字提示Tooltip'
        desc='用于局部提示'
      />

      <View className='content'>
        <GroupSection title='提示类型'>
          <HuiTooltip visible={showAutoClose} content='提示内容' onClose={() => setShowAutoClose(false)}>
            <HuiButton
              type='secondary'
              style={{ marginRight: Taro.pxTransform(24) }}
              width={146}
              onClick={() => setShowAutoClose(true)}
            >
              自动关闭提示
            </HuiButton>
          </HuiTooltip>
          <HuiTooltip
            visible={showClosable}
            content='提示内容'
            placement='topLeft'
            closable
            onClose={() => setShowClosable(false)}
          >
            <HuiButton
              type='secondary'
              width={146}
              onClick={() => setShowClosable(true)}
            >
              手动关闭提示
            </HuiButton>
          </HuiTooltip>
        </GroupSection>

        <GroupSection title='提示样式'>
          <View className='row'>
            <HuiTooltip visible={showTopLeft} placement='topLeft' content='提示内容' onClose={() => setShowTopLeft(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowTopLeft(true)}>左上方提示</HuiButton>
            </HuiTooltip>
            <HuiTooltip visible={showTop} placement='top' content='提示内容' onClose={() => setShowTop(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowTop(true)}>居中上提示</HuiButton>
            </HuiTooltip>
            <HuiTooltip visible={showTopRight} placement='topRight' content='提示内容' onClose={() => setShowTopRight(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowTopRight(true)}>右上方提示</HuiButton>
            </HuiTooltip>
          </View>
          <View className='row center-special'>
            <HuiTooltip visible={showRight} placement='right' content='提示内容' onClose={() => setShowRight(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowRight(true)}>右侧提示</HuiButton>
            </HuiTooltip>
            <HuiTooltip visible={showLeft} placement='left' content='提示内容' onClose={() => setShowLeft(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowLeft(true)}>左侧提示</HuiButton>
            </HuiTooltip>
          </View>
          <View className='row'>
            <HuiTooltip visible={showBottomLeft} placement='bottomLeft' content='提示内容' onClose={() => setShowBottomLeft(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowBottomLeft(true)}>左下方提示</HuiButton>
            </HuiTooltip>
            <HuiTooltip visible={showBottom} placement='bottom' content='提示内容' onClose={() => setShowBottom(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowBottom(true)}>居中下提示</HuiButton>
            </HuiTooltip>
            <HuiTooltip visible={showBottomRight} placement='bottomRight' content='提示内容' onClose={() => setShowBottomRight(false)}>
              <HuiButton type='secondary' width={104} onClick={() => setShowBottomRight(true)}>右下方提示</HuiButton>
            </HuiTooltip>
          </View>
        </GroupSection>

        <GroupSection title='提示溢出'>
          <HuiTooltip
            visible={showEllipsis}
            content='提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容'
            onClose={() => setShowEllipsis(false)}
          >
            <HuiButton type='secondary' width={146} onClick={() => setShowEllipsis(true)}>提示文案溢出</HuiButton>
          </HuiTooltip>
        </GroupSection>
      </View>
    </View>
  )
}

export default TooltipPage
