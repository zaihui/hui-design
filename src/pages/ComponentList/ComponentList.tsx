import React from 'react'
import { View } from '@tarojs/components'

import { getCurrentInstance } from '@tarojs/taro'
import HuiIcon from '@/components/Icon/Icon'
import { HIconType } from '@/components/Icon/type'

import router from '@/router'

import './ComponentList.scss'

enum Category {
  /** 基础类 */
  Base = 'base',
  /** 展示类 */
  Presentation = 'presentation',
  /** 表单类 */
  Form = 'form',
  /** 导航类 */
  Navigation = 'navigation',
  /** 操作反馈 */
  Feedback = 'feedback',
  /** 其他业务组件 */
  Business = 'business'
}

const CategoryMap = new Map<Category, { title: string; icon: HIconType }>([
  [Category.Base, {
    title: '基础类',
    icon: '009-checkbox',
  }],
  [Category.Presentation, {
    title: '展示类',
    icon: '009-checkbox',
  }],
  [Category.Form, {
    title: '表单类',
    icon: '009-checkbox',
  }],
  [Category.Navigation, {
    title: '导航类',
    icon: '009-checkbox',
  }],
  [Category.Feedback, {
    title: '操作反馈类',
    icon: '009-checkbox',
  }],
  [Category.Business, {
    title: '其他业务组件',
    icon: '009-checkbox',
  }],
])

const THEME_COLOR = '#ed3737'

const ComponentList: React.FC = () => {
  const { q } = getCurrentInstance().router?.params ?? {}
  let obj: { category?: Category } = {}
  try {
    obj = JSON.parse(decodeURIComponent(q || ''))
  } catch {}

  const { category = Category.Base } = obj

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { title, icon } = CategoryMap.get(category as Category || Category.Base)!

  return (
    <View className='component-list-page'>
      <View className='header'>
        <View className='icon'>
          <HuiIcon name={icon} size={40} color={THEME_COLOR} />
        </View>
        <View className='title'>{title}</View>
      </View>

      <View className='content'>
        {/* 基础类 */}
        {category === Category.Base && (
          <>
            <ListItem onClick={() => { router.Button.navigateTo() }}>按钮 Button</ListItem>
            <ListItem onClick={() => { router.Icon.navigateTo() }}>图标 Icon</ListItem>
          </>
        )}

        {/* 表单类 */}
        {category === Category.Form && (
          <>
            <ListItem onClick={() => { router.Input.navigateTo() }}>单行文本框 Input</ListItem>
            <ListItem onClick={() => { router.TextArea.navigateTo() }}>多行文本框 TextArea</ListItem>
            <ListItem onClick={() => { router.Switch.navigateTo() }}>开关 Switch</ListItem>
            <ListItem onClick={() => { router.Checkbox.navigateTo() }}>复选框 Checkbox</ListItem>
            <ListItem onClick={() => { router.Radio.navigateTo() }}>单选框 Radio</ListItem>
            <ListItem onClick={() => { router.Stepper.navigateTo() }}>步进器 Stepper</ListItem>
            <ListItem onClick={() => { router.Search.navigateTo() }}>搜索组件 Search</ListItem>
            <ListItem onClick={() => { router.Select.navigateTo() }}>模态选择器 Select</ListItem>
          </>
        )}

        {/* 展示类 */}
        {category === Category.Presentation && (
          <>
            <ListItem onClick={() => { router.Divider.navigateTo() }}>分割线 Divider</ListItem>
            <ListItem onClick={() => { router.DefaultPage.navigateTo() }}>空状态 DefaultPage</ListItem>
            <ListItem onClick={() => { router.Sticky.navigateTo() }}>吸顶布局 Sticky</ListItem>
            <ListItem onClick={() => { router.Tag.navigateTo() }}>标签 Tag</ListItem>
            <ListItem onClick={() => { router.List.navigateTo() }}>列表 List</ListItem>
            <ListItem onClick={() => { router.SwiperIndicator.navigateTo() }}>
              Swiper指示器 SwiperIndicator
            </ListItem>
            <ListItem onClick={() => { router.Badge.navigateTo() }}>徽标 Badge</ListItem>
            <ListItem onClick={() => { router.NoticeBar.navigateTo() }}>通知 NoticeBar</ListItem>
            <ListItem onClick={() => { router.Image.navigateTo() }}>图片 Image</ListItem>
            <ListItem onClick={() => { router.Avatar.navigateTo() }}>头像 Avatar</ListItem>
          </>
        )}

        {/* 导航类 */}
        {category === Category.Navigation && (
          <>
            <ListItem onClick={() => { router.Filter.navigateTo() }}>筛选栏 Filter</ListItem>
            <ListItem onClick={() => { router.Tabs.navigateTo() }}>分段控制器 Tabs</ListItem>
            <ListItem onClick={() => { router.Grid.navigateTo() }}>宫格导航 Grid</ListItem>
          </>
        )}

        {/* 操作反馈类 */}
        {category === Category.Feedback && (
          <>
            <ListItem onClick={() => { router.ToastPage.navigateTo() }}>轻提示 Toast</ListItem>
            <ListItem onClick={() => { router.Loader.navigateTo() }}>加载 Loader</ListItem>
            <ListItem onClick={() => { router.Tooltip.navigateTo() }}>文字提示 Tooltip</ListItem>
            <ListItem onClick={() => { router.Popup.navigateTo() }}>弹窗层 Popup</ListItem>
            <ListItem onClick={() => { router.Modal.navigateTo() }}>模态窗 Modal</ListItem>
            <ListItem onClick={() => { router.Dialog.navigateTo() }}>对话框 Dialog</ListItem>
            <ListItem onClick={() => { router.ActionSheet.navigateTo() }}>动作表 ActionSheet</ListItem>
            <ListItem onClick={() => { router.Picker.navigateTo() }}>选择器 Picker</ListItem>
          </>
        )}

        {/* 其他业务组件 */}
        {category === Category.Business && (
          <>
          <ListItem onClick={() => { router.Demo.navigateTo() }}>测试页面 DemoPage</ListItem>
          <ListItem onClick={() => { router.Login.navigateTo() }}>登录 Login</ListItem>
          </>
        )}
      </View>
    </View>
  )
}

interface ListItemProps {
  onClick?: () => void
  border?: boolean
  children?: React.ReactNode
}
const ListItem: React.FC<ListItemProps> = props => {
  const { border = true, onClick = () => void 0, children } = props

  return (
    <View className='list-item' onClick={onClick}>
      <View className={`list-item-container ${border ? 'with-border' : ''}`}>
        <View className='list-item-content'>
          {children}
        </View>
        <View className='list-item-action'>
          <HuiIcon name='012-arrowright' />
        </View>
      </View>
    </View>
  )
}

export default ComponentList
