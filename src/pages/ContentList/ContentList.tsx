import React from 'react'
import { View } from '@tarojs/components'

import ContentList from '@/components/ContentList'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import './ContentList.scss'

const { Item } = ContentList

const ContentListPage: React.FC = () => {
  const imgs = ['', '', '', '', '']

  return (
    <View className='content-list-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-list-21053101.png'
        title='内容列表List'
        desc='文字或图片列表的展示'
      />

      <View className='list-main'>
        <GroupSection title='列表类型'>
          <SubGroupSection title='左右布局'>
            <ContentList>
              <Item label='标题文字' value='内容内容内容内容内容内容内容内容' />
              <Item
                label='标题文字最长限制84px'
                value='内容内容内容内容内容内容内容内容最长274px'
              />
              <Item label='图片' value={imgs} />
            </ContentList>
          </SubGroupSection>

          <SubGroupSection title='长标签'>
            <ContentList>
              <Item longLabel label='标题文字' value='内容' />
              <Item
                longLabel
                label='标题文字标题文字标题文字最长限制274px'
                value='内容内容内容内容内容内容内容内容最长84px'
              />
            </ContentList>
          </SubGroupSection>

          <SubGroupSection title='上下布局'>
            <ContentList>
              <Item type='vertical' label='标题文字' value='内容内容内容内容内容内容内容内容' />
              <Item type='vertical' label='图片' value={imgs} />
            </ContentList>
          </SubGroupSection>
        </GroupSection>
      </View>
    </View>
  )
}

export default ContentListPage
