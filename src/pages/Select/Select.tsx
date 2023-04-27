import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiSelect from '@/components/Select'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import HuiButton from '@/components/Button/Button'

import './Select.scss'

const data = [{ 'label': '通用岗位', 'value': '通用岗位', 'children': [{ 'label': '销售', 'value': '销售' }, { 'label': '市场', 'value': '市场' }, { 'label': '人力资源', 'value': '人力资源' }, { 'label': '行政', 'value': '行政' }, { 'label': '公关', 'value': '公关' }, { 'label': '客服', 'value': '客服' }, { 'label': '采购', 'value': '采购' }, { 'label': '技工', 'value': '技工' }, { 'label': '公司职员', 'value': '公司职员' }, { 'label': '职业经理人', 'value': '职业经理人' }, { 'label': '私营企业主', 'value': '私营企业主' }, { 'label': '中层管理者', 'value': '中层管理者' }, { 'label': '自由职业者', 'value': '自由职业者' }] }, { 'label': 'IT互联网', 'value': 'IT互联网', 'children': [{ 'label': '开发工程师', 'value': '开发工程师' }, { 'label': '测试工程师', 'value': '测试工程师' }, { 'label': '设计师', 'value': '设计师' }, { 'label': '运营师', 'value': '运营师' }, { 'label': '产品经理', 'value': '产品经理' }, { 'label': '风控安全', 'value': '风控安全' }, { 'label': '个体／网店', 'value': '个体／网店' }] }, { 'label': '文化传媒', 'value': '文化传媒', 'children': [{ 'label': '编辑策划', 'value': '编辑策划' }, { 'label': '记者', 'value': '记者' }, { 'label': '艺人', 'value': '艺人' }, { 'label': '经纪人', 'value': '经纪人' }, { 'label': '媒体工作者', 'value': '媒体工作者' }] }, { 'label': '金融', 'value': '金融', 'children': [{ 'label': '咨询', 'value': '咨询' }, { 'label': '投行', 'value': '投行' }, { 'label': '保险', 'value': '保险' }, { 'label': '金融分析', 'value': '金融分析' }, { 'label': '财务', 'value': '财务' }, { 'label': '风险管理', 'value': '风险管理' }, { 'label': '风险投资人', 'value': '风险投资人' }] }, { 'label': '教育培训', 'value': '教育培训', 'children': [{ 'label': '学生', 'value': '学生' }, { 'label': '留学生', 'value': '留学生' }, { 'label': '大学生', 'value': '大学生' }, { 'label': '研究生', 'value': '研究生' }, { 'label': '博士', 'value': '博士' }, { 'label': '科研人员', 'value': '科研人员' }, { 'label': '教师', 'value': '教师' }] }, { 'label': '医疗生物', 'value': '医疗生物', 'children': [{ 'label': '医生', 'value': '医生' }, { 'label': '护士', 'value': '护士' }, { 'label': '宠物医生', 'value': '宠物医生' }, { 'label': '医学研究', 'value': '医学研究' }] }, { 'label': '政府组织', 'value': '政府组织', 'children': [{ 'label': '公务员', 'value': '公务员' }, { 'label': '事业单位', 'value': '事业单位' }, { 'label': '军人', 'value': '军人' }, { 'label': '律师', 'value': '律师' }, { 'label': '警察', 'value': '警察' }, { 'label': '国企工作者', 'value': '国企工作者' }, { 'label': '运动员', 'value': '运动员' }] }, { 'label': '工业制造', 'value': '工业制造', 'children': [{ 'label': '技术研发', 'value': '技术研发' }, { 'label': '技工', 'value': '技工' }, { 'label': '质检', 'value': '质检' }, { 'label': '建筑工人', 'value': '建筑工人' }, { 'label': '装修工人', 'value': '装修工人' }, { 'label': '建筑设计师', 'value': '建筑设计师' }] }, { 'label': '餐饮出行', 'value': '餐饮出行', 'children': [{ 'label': '厨师', 'value': '厨师' }, { 'label': '服务员', 'value': '服务员' }, { 'label': '收银', 'value': '收银' }, { 'label': '导购', 'value': '导购' }, { 'label': '保安', 'value': '保安' }, { 'label': '乘务人员', 'value': '乘务人员' }, { 'label': '驾驶员', 'value': '驾驶员' }, { 'label': '航空人员', 'value': '航空人员' }, { 'label': '空乘', 'value': '空乘' }] }, { 'label': '服务业', 'value': '服务业', 'children': [{ 'label': '导游', 'value': '导游' }, { 'label': '快递员（含外卖）', 'value': '快递员（含外卖）' }, { 'label': '美容美发', 'value': '美容美发' }, { 'label': '家政服务', 'value': '家政服务' }, { 'label': '婚庆摄影', 'value': '婚庆摄影' }, { 'label': '运动健身', 'value': '运动健身' }] }, { 'label': '其他', 'value': '其他', 'children': [{ 'label': '其他', 'value': '其他' }] }]
const shortData = [{ 'label': '通用岗位', 'value': '通用岗位', 'children': [{ 'label': '销售', 'value': '销售' }, { 'label': '市场', 'value': '市场' }, { 'label': '人力资源', 'value': '人力资源' }] }, { 'label': 'IT互联网', 'value': 'IT互联网', 'children': [{ 'label': '开发工程师', 'value': '开发工程师' }, { 'label': '测试工程师', 'value': '测试工程师' }, { 'label': '设计师', 'value': '设计师' }, { 'label': '运营师', 'value': '运营师' }, { 'label': '产品经理', 'value': '产品经理' }, { 'label': '风控安全', 'value': '风控安全' }, { 'label': '个体／网店', 'value': '个体／网店' }] }]

const DemoPage: React.FC = () => {
  const [v1, setV1] = useState(false)
  const [V2, setV2] = useState(false)
  const [V3, setV3] = useState(false)
  const [V4, setV4] = useState(false)
  const [V5, setV5] = useState(false)

  const [data1, setData1] = useState<(string | number)[]>([])
  const [data2, setData2] = useState<(string | number)[]>(['开发工程师', '测试工程师'])
  const [data3, setData3] = useState<(string | number)[]>([])
  const [data4, setData4] = useState<(string | number)[]>([])
  const [data5, setData5] = useState<(string | number)[]>([])

  const [loading5, setLoading5] = useState(false)

  // #region demo
  return (
    <View className='select-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-30/hui-design-picker-21053001.png'
        title='选择器Select'
        desc='选择组件'
      />
      <View className='content'>
        <GroupSection title='选择器组件'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setV1(true)}
            >
              单组选择器样式
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setV2(true)}
            >
              多组选择器样式
            </HuiButton>
          </View>
        </GroupSection>
        <GroupSection title='特殊场景'>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setV3(true)}
            >
              模拟异步请求
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setV4(true)}
            >
              选项过少，容器高度不足
            </HuiButton>
          </View>
          <View className='row'>
            <HuiButton
              block
              type='secondary'
              onClick={() => setV5(true)}
            >
              多组时，每个分组选项高度不一致
            </HuiButton>
          </View>
        </GroupSection>
      </View>

      <HuiSelect
        visible={v1}
        title='这是个标题'
        level={1}
        options={data}
        value={data1}
        onConfirm={v => {
          setData1(v)
          setV1(false)
        }}
        onClose={() => setV1(false)}
      ></HuiSelect>

      <HuiSelect
        multiSelect
        showBadge
        visible={V2}
        title='选择后展示徽标'
        options={data}
        value={data2}
        onConfirm={v => {
          setData2(v)
          setV2(false)
        }}
        onClose={() => setV2(false)}
      ></HuiSelect>

      <HuiSelect
        multiSelect
        visible={V3}
        title='这是个标题'
        options={data}
        value={data3}
        loading={loading5}
        onConfirm={v => {
          setData3(v)
          setV3(false)
        }}
        onClose={() => setV3(false)}
        onChangeSideMenu={async () => {
          setLoading5(true)
          await new Promise<void>(res => setTimeout(() => res(), 1000))
          setLoading5(false)
        }}
      ></HuiSelect>

      <HuiSelect
        level={1}
        visible={V4}
        title='这是个标题'
        options={shortData}
        value={data4}
        onConfirm={v => {
          setData4(v)
          setV4(false)
        }}
        onClose={() => setV4(false)}
      ></HuiSelect>

      <HuiSelect
        multiSelect
        showBadge
        visible={V5}
        title='这是个标题'
        options={shortData}
        value={data5}
        onConfirm={v => {
          setData5(v)
          setV5(false)
        }}
        onClose={() => setV5(false)}
        contentHeight={200}
      ></HuiSelect>
    </View>
  )
}
// #endregion demo

export default DemoPage
