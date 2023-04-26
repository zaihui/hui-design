import React from 'react'
import { View } from '@tarojs/components'

import List from '@/components/List'
import HuiImage from '@/components/Image'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import './List.scss'

const DefaultIcon = () => <View className='default-icon' />

const ListPage: React.FC = () => (
    <View className='list-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-list-21053101.png'
        title='列表List'
        desc='可承载文字、列表、图片数据的展示'
      />

      <View className='content'>
        <GroupSection title='列表类型'>
          <SubGroupSection title='基础列表'>
            <List.Item title='标题文字' />
            <List.Item title='标题文字' icon={<DefaultIcon />} />
            <List.Item title='标题文字最长限制180px' tips='提示信息最长120px' />
            <List.Item title='标题文字最长限制180px' tips='提示信息最长120px' icon={<DefaultIcon />} />
          </SubGroupSection>

          <SubGroupSection title='带图列表'>
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' />
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' icon={<DefaultIcon />} />
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' tips='提示信息最长120px' />
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' tips='提示信息最长120px' icon={<DefaultIcon />} />
          </SubGroupSection>

          <SubGroupSection title='带描述列表'>
            <List.Item title='标题文字' description='描述信息' />
            <List.Item title='标题文字' description='描述信息' icon={<DefaultIcon />} />
            <List.Item title='标题文字' description='描述信息' tips='提示信息最长120px' />
            <List.Item title='标题文字' description='描述信息' tips='提示信息最长120px' icon={<DefaultIcon />} />
          </SubGroupSection>

          <SubGroupSection title='带图片和描述列表'>
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' description='描述信息' />
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' description='描述信息' icon={<DefaultIcon />} />
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' description='描述信息' tips='提示信息最长120px' />
            <List.Item avatar={<HuiImage width={32} height={32} src='' />} title='标题文字' description='描述信息' tips='提示信息最长120px' icon={<DefaultIcon />} />
          </SubGroupSection>
        </GroupSection>
      </View>
    </View>
)

export default ListPage
