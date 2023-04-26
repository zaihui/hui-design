import React from 'react'
import { View } from '@tarojs/components'
import PageHeader from '@/demoComponents/PageHeader'

import HuiFooter from '@/components/Footer'
import GroupSection from '@/demoComponents/GroupSection'

import './Footer.scss'

const FooterDemoPage: React.FC = () =>
  <View className='footer-demo-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-08-02/hui-desigin-footer-21080201.png'
      title='页脚Footer'
      desc='Footer元素代表了页面内容或者区域内容最底端的展示。一个典型的例子是包含了作者信息。'
    />
    <View className='content'>
      <GroupSection title='单独文案样式'>
        <HuiFooter content='再惠提供技术支持' />
      </GroupSection>
      <GroupSection title='logo+文案样式'>
        <HuiFooter content='再惠提供技术支持' image='https://r.kezaihui.com/client/2021-05-27/hui-design-actionsheet-21052701.png' />
      </GroupSection>
    </View>
  </View>

export default FooterDemoPage
