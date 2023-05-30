import React from 'react'
import { View } from '@tarojs/components'

import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import HuiTitle, { HuiTitleSize } from '@/components/Title'

import './Title.scss'

const TitlePage: React.FC = () => (
  <View className='title-page'>
    <PageHeader title='🪶标题Title' desc='' />
    <View className='content'>
      <GroupSection title='仅标题'>
        <HuiTitle className='hui-demo-title' title='标题名称' size={HuiTitleSize.Small} />
        <HuiTitle className='hui-demo-title' title='标题名称名称' size={HuiTitleSize.Medium} />
        <HuiTitle className='hui-demo-title' title='标题名称' size={HuiTitleSize.Large} />
      </GroupSection>
      <GroupSection title='标题&链接/交互'>
        <HuiTitle
          className='hui-demo-title'
          title='标题名称'
          size={HuiTitleSize.Small}
          linkRightIcon='h010-right'
        />
        <HuiTitle
          className='hui-demo-title'
          title='标题名称名称'
          size={HuiTitleSize.Medium}
          link='全部门店'
          linkRightIcon='h010-right'
        />
        <HuiTitle
          className='hui-demo-title'
          title='标题名称'
          size={HuiTitleSize.Large}
          link='全部门店'
          linkRightIcon='h010-right'
        />
        <HuiTitle
          className='hui-demo-title'
          title='标题名称名称'
          size={HuiTitleSize.Medium}
          link='联系门店'
          linkLeftIcon='h025-phone'
        />
        <HuiTitle
          className='hui-demo-title'
          title='标题名称'
          size={HuiTitleSize.Large}
          link='联系门店'
          linkLeftIcon='h025-phone'
        />
      </GroupSection>
    </View>
  </View>
)

export default TitlePage
