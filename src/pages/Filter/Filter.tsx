import HuiFilter from '@/components/Filter'
import HuiTag from '@/components/Tag'
import GroupSection from '@/demoComponents/GroupSection'
import PageHeader from '@/demoComponents/PageHeader'
import { View } from '@tarojs/components'
import React, { useMemo, useState } from 'react'
import cx from 'classnames'

import HuiForm, { useForm } from '@/components/Form/index'

import CollapsePanel from '@/components/CollapsePanel'
import HuiButton from '@/components/Button/Button'
import HuiSearch from '@/components/Search'
import HuiStepper from '@/components/Stepper'
import HuiSwitch from '@/components/Switch'

import './Filter.scss'

const TagsGroup = (props) => {
  const { onChange, length = 5, value = 0 } = props
  const tags = useMemo(() => new Array(length).fill('标签'), [length])
  const mockTags = useMemo(
    () => tags.map((t, index) => `${t}${index + 1}`),
    [tags],
  )
  return (
    <View className='tags-group'>
      {mockTags.length &&
        mockTags.map((t, index) => (
          <HuiTag
            onClick={() => {
              onChange(index + 1)
            }}
            type={value === index + 1 ? 'solid' : 'hollow'}
          >
            {t}
          </HuiTag>
        ))}
    </View>
  )
}
const MenuPage: React.FC = () => {
  const [form] = useForm()
  const [pageScrollable, setPageScrollable] = useState<boolean>(false)

  const [val1, setVal1] = useState('')

  const options = [
    { value: '1', text: '再惠' },
    { value: '2', text: '麒麟' },
  ]
  const options1 = [
    { value: '1', text: '筛选条件很长挨打挨打的啊' },
    { value: '2', text: '麒麟' },
  ]

  const MockFilters = () => (
    <HuiForm form={form}>
      <CollapsePanel title='步进器' name={`${Date.now()}`} active>
        <HuiForm.Item name='stepper'>
          <HuiStepper type='number' />
        </HuiForm.Item>
      </CollapsePanel>
      <CollapsePanel title='开关' name={`${Date.now()}`}>
        <HuiForm.Item name='switch'>
          <HuiSwitch />
        </HuiForm.Item>
      </CollapsePanel>
      <CollapsePanel
        title='标签组1'
        name={`tags1-${Date.now()}`}
        active={false}
      >
        <HuiForm.Item name='tags1'>
          <TagsGroup length={10} />
        </HuiForm.Item>
      </CollapsePanel>
      <CollapsePanel title='标签组2' name={`tags2-${Date.now()}`}>
        <HuiForm.Item name='tags2'>
          <TagsGroup length={20} />
        </HuiForm.Item>
      </CollapsePanel>
    </HuiForm>
  )

  const allClear = () => {
    form?.reset()
  }

  return (
    <View
      className={cx('filter-page', {
        'page-disable-scroll': pageScrollable,
      })}
    >
      <PageHeader title='筛选栏Filter' desc='' />
      <View className='content'>
        <GroupSection title='单维度筛选'>
          <View className='gap'>
            <HuiFilter
              sticky
              menuConfig={{
                className: 'hui-menu-xxx',
                menuItems: [
                  {
                    value: '1',
                    options,
                  },
                ],
              }}
            />
            <HuiFilter
              sticky
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
              sticky
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
        <GroupSection title='单维度筛选(打开弹窗禁止页面滚动)'>
          <HuiFilter
            sticky
            menuConfig={{
              className: 'hui-menu-xxx',
              menuItems: [
                {
                  value: '1',
                  options,
                  onMaskClose: () => {
                    setPageScrollable(false)
                  },
                },
                {
                  value: '2',
                  options,
                  onMaskClose: () => {
                    setPageScrollable(false)
                  },
                },
              ],
              onMenuTitleClick: (_e, _index, maskShow) => {
                setPageScrollable(maskShow)
              },
            }}
          />
        </GroupSection>
        <GroupSection title='多维度收纳筛选'>
          <View className='gap'>
            <HuiFilter
              sticky
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
                filterContent: <MockFilters />,
                onConfirm: () => console.log('get', form?.getFieldsValue()),
                onClear: () => allClear(),
              }}
            />
            <HuiFilter
              sticky
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
                onMenuTitleClick: (e, index, maskShow) => {
                  console.log(
                    'e===>',
                    e,
                    'index===>',
                    index,
                    'maskShow===>',
                    maskShow,
                  )
                },
              }}
              filtersContentConfig={{
                filterContent: <MockFilters />,
                onConfirm: () => console.log('get', form?.getFieldsValue()),
                onClear: () => allClear(),
              }}
            />

            <HuiFilter
              fixed
              filtersContentConfig={{
                position: 'right',
                filterContent: <MockFilters />,
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
                filterContent: <MockFilters />,
                onClear: () => allClear(),
              }}
            />
          </View>
        </GroupSection>
        <View style={{ height: 1500 }}></View>
      </View>
    </View>
  )
}

export default MenuPage
