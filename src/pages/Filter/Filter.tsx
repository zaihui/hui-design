import React, { useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import HuiFilter from '@/components/Filter'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import HuiSwitch from '@/components/Switch'
import HuiStepper from '@/components/Stepper'

import './Filter.scss'

const MenuPage: React.FC = () => {
  const options = [
    { value: '1', text: '再惠' },
    { value: '2', text: '麒麟' },
  ]

  const [valState, setValState] = useState({
    val1: 0,
  })
  const [checked, setChecked] = useState<boolean>(false)

  const mockFiltersConfig = useMemo(() => [
    {
      key: 'stepper',
      label: '步进器',
      name: 'stepper',
      children: <HuiStepper
        type='number'
        value={valState.val1}
        onChange={val => {
          setValState({
            ...valState,
            val1: val,
          })
        }}
      />,
    },
    {
      key: 'switch',
      label: '开关',
      name: 'switch',
      children: <HuiSwitch checked={checked} onChange={e => { setChecked(e) }} />,
    },
  ], [checked, valState])

  return (
    <View className='filter-page'>
      <PageHeader title='Filter组件' desc='筛选器' />
      <View className='content'>
        <GroupSection title='单维度筛选（支持传入options配置或children）'>
          <HuiFilter
            menuConfig={{
              className: 'hui-menu-xxx',
              menuItems: [
                {
                  value: '1',
                  options,
                },
              ],
            }}
            filtersContentConfig={{
              type: 'multiple',
              filterItems: mockFiltersConfig,
              onConfirm: val => console.log('multiple val', val),
            }}
          />
        </GroupSection>
        <GroupSection title='下拉框自定义'>
          <HuiFilter
            menuConfig={{
              className: 'hui-menu-xxx',
              menuItems: [
                {
                  title: '自定义title',
                  footer: true,
                  children: ({ hideMenu }) => (
                    <View>
                      <HuiButton onClick={() => hideMenu()}>ok</HuiButton>
                    </View>
                  ),
                },
                {
                  options,
                  onChange: item => {
                    console.log(item)
                  },
                  value: options[0].value,
                },
              ],
            }}
            filtersContentConfig={{
              filterItems: mockFiltersConfig,
              onConfirm: val => console.log('single val', val),
            }}
          />
        </GroupSection>
        <GroupSection title='下拉框自定义1'>
          <HuiFilter
            menuConfig={{
              className: 'hui-menu-xxx',
              menuItems: [
                {
                  title: '自定义title',
                  footer: true,
                  children: ({ hideMenu }) => (
                    <View>
                      <HuiButton onClick={() => hideMenu()}>ok</HuiButton>
                    </View>
                  ),
                },
                {
                  options,
                  onChange: item => {
                    console.log(item)
                  },
                  value: options[0].value,
                },
              ],
            }}
          />
        </GroupSection>
        <GroupSection title='左侧内容区自定义 + fixed'>
          <HuiFilter
            fixed
            filtersContentConfig={{
              position: 'right',
              filterItems: mockFiltersConfig,
            }}
          >search</HuiFilter>
        </GroupSection>
      </View>
      <View style={{ height: 3000 }}></View>
    </View>
  )
}

export default MenuPage
