import React from 'react'
import { View } from '@tarojs/components'

import HuiTag from '@/components/Tag'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Tag.scss'

interface TagItemProps {
  name: string
  children?: React.ReactNode
}
const TagItem: React.FC<TagItemProps> = props => {
  const { name, children } = props
  return (
    <View className='tag-item'>
      <View className='title'>{name}</View>
      <View className='content'>{children}</View>
    </View>
  )
}

const TagPage: React.FC = () => (
  <View className='tag-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-05-27/hui-design-tag-21052701.png'
      title='标签Tag'
      desc='用于标记元素的属性和维度或分类，可自定义圆角大小、颜色'
    />
    <View className='content'>
      <GroupSection title='标签类型'>
        <View className='tag-list-container'>
          <TagItem name='实心标签'><HuiTag type='solid'>标签</HuiTag></TagItem>
          <TagItem name='半透明标签'><HuiTag type='semitransparent'>标签</HuiTag></TagItem>
          <TagItem name='空心标签'><HuiTag type='hollow'>标签</HuiTag></TagItem>
        </View>
      </GroupSection>
      <GroupSection title='标签大小'>
        <View className='tag-list-container'>
          <TagItem name='大号标签'>
            <View className='column-item'>
              <View className='column-sub-item'><HuiTag size='large'>标签</HuiTag></View>
              <View className='column-sub-item'><HuiTag size='large' type='semitransparent'>标签</HuiTag></View>
              <View className='column-sub-item'><HuiTag size='large' type='hollow'>标签</HuiTag></View>
            </View>
          </TagItem>
          <TagItem name='中号标签'>
            <View className='column-item'>
              <View className='column-sub-item'><HuiTag size='medium'>标签</HuiTag></View>
              <View className='column-sub-item'><HuiTag size='medium' type='semitransparent'>标签</HuiTag></View>
              <View className='column-sub-item'><HuiTag size='medium' type='hollow'>标签</HuiTag></View>
            </View>
          </TagItem>
          <TagItem name='小号标签'>
            {/* TODO 实现小号标签 */}
            <View className='column-item'>
              <View className='column-sub-item'><HuiTag>标签</HuiTag></View>
              <View className='column-sub-item'><HuiTag type='semitransparent'>标签</HuiTag></View>
              <View className='column-sub-item'><HuiTag type='hollow'>标签</HuiTag></View>
            </View>
          </TagItem>
        </View>
      </GroupSection>
    </View>
  </View>
)

export default TagPage
