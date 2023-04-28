/* eslint-disable no-console */
import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import HuiSearch from '@/components/Search'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'
import HuiList from '@/components/List'

import './Search.scss'

const ListItem = HuiList.Item

const Search: React.FC = () => {
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')
  const [val3, setVal3] = useState('')
  const [val4, setVal4] = useState('')
  return (
    <View className='search-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-30/hui-design-search-21053001.png'
        title='搜索Search'
        desc='在众多数据中缩小查找范围，快速获取信息'
      />
      <View className='content'>
        <GroupSection title='搜索类型'>
          <SubGroupSection title='有搜索按钮'>
            <ListItem border={false}>
              <HuiSearch
                placeholder='请输入关键词'
                searchText='搜索'
                theme='dark'
                value={val1}
                onInput={val => setVal1(val)}
                onSearch={val => Taro.showToast({ title: `您要搜索${val}` })}
              />
            </ListItem>
            <ListItem style={{ backgroundColor: '#e8e8e8' }} border={false}>
              <HuiSearch
                placeholder='请输入关键词'
                searchText='搜索'
                value={val2}
                onInput={val => setVal2(val)}
                onSearch={val => Taro.showToast({ title: `您要搜索${val}` })}
              />
            </ListItem>
          </SubGroupSection>
          <SubGroupSection title='无搜索按钮'>
            <ListItem border={false}>
              <HuiSearch
                placeholder='请输入关键词'
                theme='dark'
                value={val3}
                onInput={val => setVal3(val)}
                onSearch={val => Taro.showToast({ title: `您要搜索${val}` })}
              />
            </ListItem>
            <ListItem style={{ backgroundColor: '#e8e8e8' }} border={false}>
              <HuiSearch
                placeholder='请输入关键词'
                value={val4}
                onInput={val => setVal4(val)}
                onSearch={val => Taro.showToast({ title: `您要搜索${val}` })}
              />
            </ListItem>
          </SubGroupSection>
        </GroupSection>
      </View>
    </View>
  )
}

export default Search
