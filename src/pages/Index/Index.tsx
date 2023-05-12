import React, { useState } from 'react'
import Taro, { useShareAppMessage } from '@tarojs/taro'

import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import cls from 'classnames'

import HuiIcon from '@/components/Icon'
import { HIconType } from '@/components/Icon/type'
import router from '@/router'

import './Index.scss'

interface NavCard extends ViewProps {
  icon: HIconType
  title: string
  desc: string
  items: {
    title: string
    url: string
  }[]
}

const NavCard: React.FC<NavCard> = props => {
  const { title, desc, icon, items } = props

  const [expand, setExpand] = useState(false)

  const handleClickSubItem = subItem => {
    Taro.navigateTo({
      url: subItem.url,
    })
  }

  return (
    <View className='nav-card'>
      <View className={cls('main-content', { 'with-border': expand })} onClick={() => setExpand(!expand)}>
        <View className='left'><HuiIcon name={icon} size={32} /></View>
        <View className='right'>
          <View className='title'>
            {title}
          </View>
          <View className='desc'>{desc}</View>
        </View>
      </View>
      <View className={cls('sub-items', { visible: expand })}>
        {items.length > 0 && (
          <View className='sub-items-content'>
            {items.map(item => (
              <View key={item.url} className='sub-item' onClick={() => handleClickSubItem(item)}>
                <View className='sub-title'>{item.title}</View>
                <HuiIcon name='012-arrowright' color='#b1b1b1' />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

const NAV_LIST: {
  title: string
  desc: string
  icon: HIconType
  items: {
    title: string
    url: string
  }[]
}[] = [
  {
    title: '基础',
    desc: '包含颜色、文本、图标等',
    icon: '182-basiscirde',
    items: [
      { title: '颜色Color', url: router.Color.url },
      { title: 'Typography 文字', url: router.Text.url },
      { title: '图标Icon', url: router.Icon.url },
      { title: '按钮Button', url: router.Button.url },
      { title: '页面层级Layer', url: router.Layer.url },
      { title: '弹出层Popup', url: router.Popup.url },
      { title: '悬浮按钮FAB', url: router.FloatingActionButton.url },
      { title: '高亮文本', url: router.HightLightText.url },
    ],
  },
  {
    title: '表单',
    desc: '包含单双行文本框、步进器、开关等',
    icon: '183-formcirde',
    items: [
      { title: '单行文本Text Field', url: router.Input.url },
      { title: '多行文本框Text Area', url: router.TextArea.url },
      { title: '开关Switch', url: router.Switch.url },
      { title: '复选框Checkbox', url: router.Checkbox.url },
      { title: '单选框Radio', url: router.Radio.url },
      { title: '步进器Stepper', url: router.Stepper.url },
      { title: '搜索Search', url: router.Search.url },
      { title: '选择器Select', url: router.Select.url },
      { title: '表单Form', url: router.Form.url },
    ],
  },
  {
    title: '展示',
    desc: '包含分割、空状态、标签等',
    icon: '185-showcirde',
    items: [
      { title: '分割线Divider', url: router.Divider.url },
      { title: '空状态Default Page', url: router.DefaultPage.url },
      { title: '标签Tag', url: router.Tag.url },
      { title: '列表List', url: router.List.url },
      { title: '内容列表', url: router.ContentList.url },
      { title: '徽标Badge', url: router.Badge.url },
      { title: '通知Notice Bar', url: router.NoticeBar.url },
      { title: '头像Avatar', url: router.Avatar.url },
      { title: '图片Image', url: router.Image.url },
      { title: '图文展示Editor display', url: router.EditorDisplay.url },
      { title: '遮罩Mask', url: router.Mask.url },
      { title: '计时器Timer', url: router.Timer.url },
      { title: '页脚Footer', url: router.Footer.url },
      { title: '骨架屏Skeleton', url: router.Skeleton.url },
      { title: '标题栏', url: router.Title.url },
      { title: '卡片Card', url: router.Card.url },
    ],
  },
  {
    title: '导航',
    desc: '包含Tab等',
    icon: '186-tabcirde',
    items: [
      { title: '筛选栏Filter', url: router.Filter.url },
      { title: '标签式分段控制器Tab', url: router.Tabs.url },
      { title: '宫格导航Grid', url: router.Grid.url },
      { title: '步骤条Steppers', url: router.Steppers.url },
    ],
  },
  {
    title: '操作反馈',
    desc: '包含弹窗、轻提示、加载等',
    icon: '009-checkcircle',
    items: [
      { title: '轻提示Toast', url: router.ToastPage.url },
      { title: '加载Loading', url: router.Loader.url },
      { title: '文字提示Tooltip', url: router.Tooltip.url },
      { title: '对话框Dialog', url: router.Dialog.url },
      { title: '滚动选择器Picker', url: router.Picker.url },
      { title: '动作表ActionSheet', url: router.ActionSheet.url },
    ],
  },
  {
    title: '业务组件',
    desc: '包含分享等',
    icon: 'h188-workcirde',
    items: [
      { title: '分享Share', url: router.Share.url },
      { title: '导航栏NavBar', url: router.NavBar.url },
    ],
  },
]

const ZAIHUI_LOGO_URL = 'https://r.kezaihui.com/default/zaihui-logo-20201120001.png'

const IndexPage: React.FC = () => {
  useShareAppMessage(() => ({
    imageUrl: ZAIHUI_LOGO_URL,
    title: '再惠组件库',
  }))
  return (
    <View className='index-page'>
      <View className='header'>
        <View className='title'>HUI DESIGN</View>
        <View className='desc'>HUI DESIGN是为再惠小程序、H5提供丰富的基础 UI 组件，使在实际业务中快速集成，开箱即用</View>
      </View>

      <View className='content'>
        {NAV_LIST.map(navData => (
          <NavCard
            key={navData.title}
            title={navData.title}
            icon={navData.icon}
            desc={navData.desc}
            items={navData.items}
          />
        ))}
      </View>
      <View
        className='team-page-entry'
        onClick={() => {
          router.Team.navigateTo()
        }}
      >
        <View>我们团队<HuiIcon name='012-right' size={12} /></View>
      </View>
    </View>
  )
}

export default IndexPage
