import React from 'react'
import { View } from '@tarojs/components'

import PageHeader from '@/demoComponents/PageHeader'

import './Team.scss'

const Members: { name: string; desc: string }[] = [
  { name: '黄子龙', desc: '前端技术' },
  { name: '杨帅', desc: '前端技术' },
  { name: '黎冠宋', desc: '前端技术' },
  { name: '陈胜', desc: '前端技术' },
  { name: '王庭铿', desc: '前端技术' },
  { name: '黄刚', desc: '前端技术' },
  { name: '丁言河', desc: '前端技术' },
  { name: '刘琳', desc: '前端技术' },
  { name: '赵仲印', desc: '前端技术' },
  { name: '刘海寒', desc: '前端技术' },
  { name: '张梦琴', desc: '前端技术' },
  { name: '郑叶', desc: '产品体验设计' },
  { name: '周业', desc: '产品体验设计' },
  { name: '吴东垠', desc: '产品体验设计' },
  { name: '罗玉平', desc: '产品体验设计' },
  { name: '孙玲玲', desc: '产品体验设计' },
].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' }))

const TeamsPage: React.FC = () => (
  <View className='team-page'>
    <PageHeader
      title='团队介绍'
      desc='感谢大家为组件库贡献的代码以及设计(排名不分先后)'
    />
    <View className='team-content'>
      {Members.map(member => (
        <View key={member.name} className='team-member'>
          <View className='name'>{member.name}</View>
          <View className='desc'>{member.desc}</View>
        </View>
      ))}
    </View>
  </View>
)

export default TeamsPage
