import React from 'react'
import { View } from '@tarojs/components'
import HuiFilter from '@/components/Filter'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Filter.scss'

const MenuPage: React.FC = () => {
  const options = [{ value: '1', text: '再惠' }, { value: '2', text: '麒麟' }]

  return <View className='filter-page'>
    <PageHeader
      title='Filter组件'
      desc='筛选器'
    />
    <View className='content'>
      <GroupSection title='单维度筛选（支持传入options配置或children）'>
        <HuiFilter menuConfig={
          {
            className: 'hui-menu-xxx',
            menuItems: [{
              value: '1',
              options,
            }],
          }
        }
        />
      </GroupSection>
      <GroupSection title='下拉框自定义'>
        <HuiFilter menuConfig={
          {
            className: 'hui-menu-xxx',
            menuItems: [{
              title: '自定义title',
              children: ({ hideMenu }) => <View>
                <HuiButton onClick={() => hideMenu()}>ok</HuiButton>
              </View>,
            }, {
              options,
              onChange: item => {
                console.log(item)
              },
              value: options[0].value,
            }],
          }
        }
        />
      </GroupSection>
    </View>
  </View>
}

export default MenuPage
