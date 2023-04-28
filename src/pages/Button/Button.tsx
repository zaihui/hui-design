import React from 'react'
import { View } from '@tarojs/components'

import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Button.scss'

interface ButtonItemProps {
  title: string
  children?: React.ReactNode
}
const ButtonItem: React.FC<ButtonItemProps> = props => {
  const { title, children } = props

  return (
    <View className='button-item'>
      <View className='title'>{title}</View>
      <View className='btn-container'>
        {children}
      </View>
    </View>
  )
}

const Button: React.FC = () => (
    <View className='button-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-button-21053101.png'
        title='按钮Button'
        desc='按钮用于触发相应的业务逻辑，我们提供了三种按钮，不同按钮类型具有不同的强调程度，从大到小：主要按钮 > 次要按钮 > 文字按钮'
      />

      <View className='content'>
        <GroupSection title='按钮类型'>
          <View className='button-list-container'>
            <ButtonItem title='主要单色按钮'>
              <HuiButton color='#ed3737'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='次要按钮'>
              <HuiButton color='#ed3737' type='secondary'>次要按钮</HuiButton>
            </ButtonItem>
            <ButtonItem title='文字按钮'>
              <HuiButton color='#ed3737' type='text'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='主要渐变按钮'>
              <HuiButton type='primary' gradientColor='linear-gradient(134deg, #F48B59 0%, #ED3737 100%)'>按钮文字</HuiButton>
            </ButtonItem>
          </View>
        </GroupSection>
        <GroupSection title='按钮大小'>
          <View className='button-list-container'>
            <ButtonItem title='大号按钮'>
              <HuiButton size='large'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='中号按钮'>
              <HuiButton size='medium'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='小号按钮'>
              <HuiButton size='small'>小号按钮</HuiButton>
            </ButtonItem>
          </View>
        </GroupSection>
        <GroupSection title='主要按钮状态'>
          <View className='button-list-container'>
            <ButtonItem title='可点击'>
              <HuiButton>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='点击中'>
              {/* TODO */}
              <HuiButton>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='不可点击'>
              <HuiButton disabled>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='加载中'>
              <HuiButton loading>按钮文字</HuiButton>
            </ButtonItem>
          </View>
        </GroupSection>
        <GroupSection title='次要按钮状态'>
          <View className='button-list-container'>
            <ButtonItem title='可点击'>
              <HuiButton type='secondary'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='点击中'>
              {/* TODO */}
              <HuiButton type='secondary'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='不可点击'>
              <HuiButton type='secondary' disabled>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='加载中'>
              <HuiButton type='secondary' loading>按钮文字</HuiButton>
            </ButtonItem>
          </View>
        </GroupSection>
        <GroupSection title='文字按钮状态'>
          <View className='button-list-container'>
            <ButtonItem title='可点击'>
              <HuiButton type='text'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='点击中'>
              {/* TODO */}
              <HuiButton type='text'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='不可点击'>
              <HuiButton type='text' disabled>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='加载中'>
              <HuiButton type='text' loading>按钮文字</HuiButton>
            </ButtonItem>
          </View>
        </GroupSection>
        {/* 这里真的支持自定义吗 */}
        <GroupSection title='自定义圆角/颜色'>
          <View className='button-list-container'>
            <ButtonItem title='主要按钮'>
              <HuiButton radiusType='square' color='#ff6c00'>按钮文字</HuiButton>
            </ButtonItem>
            <ButtonItem title='次要按钮'>
              <HuiButton type='secondary' radiusType='square' color='#ff6c00'>按钮文字</HuiButton>
            </ButtonItem>
          </View>
        </GroupSection>
      </View>
    </View>
)

export default Button
