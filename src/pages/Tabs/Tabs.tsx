/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import HuiTabs from '@/components/Tabs'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import './Tabs.scss'

const { HuiTab } = HuiTabs

const TabsPage: React.FC = () => {
  const [normalTabsTwoIndex, setNormalTabsTwoIndex] = useState<number>(0)
  const [normalTabsThreeIndex, setNormalTabsThreeIndex] = useState<number>(0)
  const [normalTabsFourIndex, setNormalTabsFourIndex] = useState<number>(0)
  const [singleLineAutoTabsIndex, setSingleLineAutoTabsIndex] =
    useState<number>(0)
  const [smileTabsIndex, setSmileTabsIndex] = useState<number>(0)
  const [twoLineAutoTabsIndex, setTwoLineAutoTabsIndex] = useState<number>(0)
  const [stickyTabsIndex, setStickyTabsIndex] = useState<number>(0)

  const [tabs, setTabs] = useState([
    {
      title: '基本信息',
      key: 'baseInfo',
    },
    {
      title: '联系人',
      key: 'linkmen',
    },
    {
      title: '拜访计划',
      key: 'visitPlan',
    },
    {
      title: '拜访记录',
      key: 'visitRecord',
    },
    {
      title: '相关订单',
      key: 'relevantOrder',
    },
    {
      title: '相关特批',
      key: 'relevantSpecialApproval',
    },
    {
      title: '流转记录',
      key: 'transfer',
    },
    {
      title: '评论记录',
      key: 'comment',
    },
  ])

  useEffect(() => {
    setTabs([
      {
        title: '基本信息',
        key: 'baseInfo',
      },
      {
        title: '确认函',
        key: 'relevantConfirmation',
      },
      {
        title: '联系人',
        key: 'linkmen',
      },
      {
        title: '拜访计划',
        key: 'visitPlan',
      },
      {
        title: '拜访记录',
        key: 'visitRecord',
      },
      {
        title: '相关订单',
        key: 'relevantOrder',
      },
      {
        title: '相关特批',
        key: 'relevantSpecialApproval',
      },
      {
        title: '流转记录',
        key: 'transfer',
      },
      {
        title: '评论记录',
        key: 'comment',
      },
    ])
  }, [])

  return (
    <View className='tabs-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-27/hui-design-tabs-21052701.png'
        title='标签式分段控制器Tab'
        desc='对页面数据分类导航'
      />

      <View className='content'>
        <GroupSection title='Tab类型'>
          <SubGroupSection title='单行固定宽度Tab'>
            <View style={{ marginBottom: Taro.pxTransform(16) }}>
              <HuiTabs
                active={normalTabsFourIndex}
                onChange={(index) => setNormalTabsFourIndex(Number(index))}
              >
                <HuiTab title='案例展示'></HuiTab>
                <HuiTab title='案例二'> </HuiTab>
                <HuiTab title='案例三'> </HuiTab>
                <HuiTab title='案例四'> </HuiTab>
              </HuiTabs>
            </View>

            <View style={{ marginBottom: Taro.pxTransform(16) }}>
              <HuiTabs
                autoScroll
                active={normalTabsThreeIndex}
                onChange={(index) => setNormalTabsThreeIndex(Number(index))}
                scroll
              >
                {tabs.map((item) => (
                  <HuiTab key={item.key} title={item.title}></HuiTab>
                ))}
              </HuiTabs>
            </View>

            <View style={{ marginBottom: Taro.pxTransform(16) }}>
              <HuiTabs
                active={normalTabsTwoIndex}
                onChange={(i) => setNormalTabsTwoIndex(Number(i))}
              >
                <HuiTab title='案例展示'></HuiTab>
                <HuiTab title='案例展示名称溢出省略了很多'></HuiTab>
              </HuiTabs>
            </View>
          </SubGroupSection>

          <SubGroupSection title='单行自适应宽度Tab'>
            <HuiTabs
              autoScroll
              scroll
              active={singleLineAutoTabsIndex}
              onChange={(index) => setSingleLineAutoTabsIndex(Number(index))}
            >
              <HuiTab title='展示案例'></HuiTab>
              <HuiTab title='案例'></HuiTab>
              <HuiTab title='案例三'></HuiTab>
              <HuiTab title='案例四'></HuiTab>
              <HuiTab title='展示案例名称'></HuiTab>
              <HuiTab title='展示案例六'></HuiTab>
            </HuiTabs>
          </SubGroupSection>

          <SubGroupSection title='双行自适应宽度Tab'>
            <HuiTabs
              hasSubTitle
              active={twoLineAutoTabsIndex}
              onChange={(index) => setTwoLineAutoTabsIndex(Number(index))}
            >
              <HuiTab title='案例展示' subTitle='描述文案'></HuiTab>
              <HuiTab title='案例' subTitle='描述文案'></HuiTab>
              <HuiTab title='案例三' subTitle='描述文案'></HuiTab>
              <HuiTab title='案例四' subTitle='描述文案'></HuiTab>
              <HuiTab title='案例展示' subTitle='描述文案'></HuiTab>
            </HuiTabs>
          </SubGroupSection>

          <SubGroupSection title='微笑样式Tab'>
            <HuiTabs
              smile
              scroll
              active={smileTabsIndex}
              onChange={(index) => setSmileTabsIndex(Number(index))}
            >
              <HuiTab title='案例展示'></HuiTab>
              <HuiTab title='案例'></HuiTab>
              <HuiTab title='案例三'></HuiTab>
              <HuiTab title='案例四'></HuiTab>
              <HuiTab title='案例展示'></HuiTab>
            </HuiTabs>
          </SubGroupSection>
        </GroupSection>

        <GroupSection title='Tab类导航吸顶展示'>
          <HuiTabs
            sticky
            active={stickyTabsIndex}
            onChange={(index) => setStickyTabsIndex(Number(index))}
          >
            <HuiTab title='第一导航'>
              <View className='sticky-tab-content item-3'>第一导航内容</View>
            </HuiTab>
            <HuiTab title='第二导航'>
              <View className='sticky-tab-content item-2'>第二导航内容</View>
            </HuiTab>
            <HuiTab title='第三导航'>
              <View className='sticky-tab-content item-3'>第三导航内容</View>
            </HuiTab>
            <HuiTab title='第四导航'>
              <View className='sticky-tab-content item-4'>第四导航内容</View>
            </HuiTab>
          </HuiTabs>
          <View className='empty-content'></View>
        </GroupSection>
      </View>
    </View>
  )
}

export default TabsPage
