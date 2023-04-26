import React from 'react'
import { View } from '@tarojs/components'

import GroupSection from '@/demoComponents/GroupSection'
import PageHeader from '@/demoComponents/PageHeader'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import Skeleton from '@/components/Skeleton'

import './Skeleton.scss'

const SkeletonDemo: React.FC = () => (
  <View className='skeleton-demo'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-08-02/hui-desigin-footer-21080201.png'
      title='骨架屏'
      desc='在需要等待加载内容的位置提供一个占位图形组合'
    />
    <View className='content'>
      <GroupSection title='标题+段落'>
        <Skeleton avatar={false} />
      </GroupSection>
      <GroupSection title='图片+标题+段落'>
        <SubGroupSection title='横向'>
          <Skeleton />
        </SubGroupSection>
        <SubGroupSection title='纵向'>
          <Skeleton type='vertical' />
        </SubGroupSection>
      </GroupSection>
      <GroupSection title='配置'>
        <SubGroupSection title='圆形头像'>
          <Skeleton avatar={{ shape: 'circle' }} />
        </SubGroupSection>
        <SubGroupSection title='小头像'>
          <Skeleton avatar={{ size: 40 }} />
        </SubGroupSection>
        <SubGroupSection title='自定义行数和宽度'>
          <Skeleton paragraph={{ rows: 5, width: ['30%', '20%', '80%', '100%', '50%'] }} />
        </SubGroupSection>
      </GroupSection>
    </View>
  </View>
)

export default SkeletonDemo
