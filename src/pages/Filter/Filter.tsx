import React, { useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import HuiFilter from '@/components/Filter'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import HuiSwitch from '@/components/Switch'
import HuiStepper from '@/components/Stepper'
import HuiTag from '@/components/Tag'
import HuiSearch from '@/components/Search'

import './Filter.scss'

const tags = new Array(10).fill('标签')
const mockTags = tags.map((t, index) => `${t}${index + 1}`)

const TagsGroup = (props) => {
  const { items = [], onChange, value } = props
  return (
    <View className='tags-group'>
      {items.length &&
        items.map((t, index) => (
          <HuiTag onClick={() => onChange(index)} type={value === index ? 'solid' : 'hollow'}>
            {t}
          </HuiTag>
        ))}
    </View>
  )
}
const MenuPage: React.FC = () => {
  const [val1, setVal1] = useState('')
  const options = [
    { value: '1', text: '再惠' },
    { value: '2', text: '麒麟' },
  ]
  const options1 = [
    { value: '1', text: '筛选条件很长挨打挨打的啊' },
    { value: '2', text: '麒麟' },
  ]

  const [valState, setValState] = useState({
    val1: 0,
  })
  const [checked, setChecked] = useState<boolean>(false)

  const [checkedTag, setCheckedTag] = useState<number | undefined>()

  const mockFiltersConfig = useMemo(
    () => [
      {
        key: 'stepper',
        label: '步进器',
        name: 'stepper',
        children: (
          <HuiStepper
            type='number'
            value={valState.val1}
            onChange={(val) => {
              setValState({
                ...valState,
                val1: val,
              })
            }}
          />
        ),
      },
      {
        key: 'switch',
        label: '开关',
        name: 'switch',
        children: (
          <HuiSwitch
            checked={checked}
            onChange={(e) => {
              setChecked(e)
            }}
          />
        ),
      },
      {
        key: 'tagsGroup',
        label: '标签组',
        name: 'tags',
        children: (
          <TagsGroup value={checkedTag} items={mockTags} onChange={(val) => setCheckedTag(val)} />
        ),
      },
      {
        key: 'stepper',
        label: '步进器',
        name: 'stepper',
        children: (
          <HuiStepper
            type='number'
            value={valState.val1}
            onChange={(val) => {
              setValState({
                ...valState,
                val1: val,
              })
            }}
          />
        ),
      },
      {
        key: 'switch',
        label: '开关',
        name: 'switch',
        children: (
          <HuiSwitch
            checked={checked}
            onChange={(e) => {
              setChecked(e)
            }}
          />
        ),
      },
      {
        key: 'tagsGroup',
        label: '标签组',
        name: 'tags',
        children: (
          <TagsGroup value={checkedTag} items={mockTags} onChange={(val) => setCheckedTag(val)} />
        ),
      },
    ],
    [checked, valState, checkedTag],
  )

  const allClear = () => {
    setChecked(false)
    setValState({ val1: 0 })
    setCheckedTag(undefined)
  }

  return (
    <View className='filter-page'>
      <PageHeader title='筛选栏Filter' desc='' />
      <View className='content'>
        <GroupSection title='单维度筛选'>
          <View className='gap'>
            <HuiFilter
              menuConfig={{
                className: 'hui-menu-xxx',
                menuItems: [{ value: '1', options }],
              }}
            />
            <HuiFilter
              menuConfig={{
                className: 'hui-menu-xxx',
                menuItems: [
                  { value: '1', options },
                  { value: '2', options },
                ],
              }}
            />
            <HuiFilter
              menuConfig={{
                className: 'hui-menu-xxx',
                menuItems: [
                  { value: '1', options },
                  { value: '2', options },
                  { value: '2', options },
                ],
              }}
            />
            <HuiFilter
              menuConfig={{
                className: 'hui-menu-xxx',
                menuItems: [
                  { value: '1', options: options1 },
                  { value: '1', options: options1 },
                  { value: '1', options: options1 },
                ],
              }}
            />
          </View>
        </GroupSection>
        <GroupSection title='多维度收纳筛选'>
          <View className='gap'>
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
                ],
              }}
              filtersContentConfig={{
                position: 'top',
                filterItems: mockFiltersConfig,
                onConfirm: (val) => console.log('single val', val),
                onClear: () => allClear(),
              }}
            />
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
                    onChange: (item) => {
                      console.log(item)
                    },
                    value: options[0].value,
                  },
                ],
              }}
              filtersContentConfig={{
                filterItems: mockFiltersConfig,
                onConfirm: (val) => console.log('single val', val),
                onClear: () => allClear(),
              }}
            />
            <HuiFilter
              fixed
              filtersContentConfig={{
                position: 'right',
                filterItems: mockFiltersConfig,
                onClear: () => allClear(),
              }}
            >
              <HuiSearch
                placeholder='请输入关键词'
                theme='dark'
                value={val1}
                onInput={(val) => setVal1(val)}
              />
            </HuiFilter>
            <HuiFilter
              menuConfig={{
                className: 'hui-menu-xxx',
                menuItems: [
                  { value: '1', options: options1 },
                  { value: '2', options: options1 },
                  { value: '1', options: options1 },
                  { value: '2', options: options1 },
                ],
              }}
              filtersContentConfig={{
                filterItems: mockFiltersConfig,
                onClear: () => allClear(),
              }}
            />
          </View>
        </GroupSection>
        <View style={{ height: 500 }}></View>
      </View>
    </View>
  )
}

export default MenuPage
