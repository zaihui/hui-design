import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import HuiStepper from '@/components/Stepper'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Stepper.scss'

const StepperSample: React.FC<{
  title: string
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='stepper-sample'>
    {title && <View className='title'>{title}</View>}
    <View className='content'>{children}</View>
  </View>
)

const Stepper: React.FC = () => {
  const [valState, setValState] = useState({
    val1: 999,
    val2: 0,
    val3: 999,
    val4: 9999,
    val5: 9999,
    val6: 99,
  })

  return (
    <View className='stepper-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-06-01/hui-design-stepper-21060101.png'
        title='步进器Stepper'
        desc='控制元素的数量'
      />
      <View className='content'>
        <GroupSection title='步进气样式'>
          <HuiStepper
            type='number'
            value={valState.val1}
            onChange={val => {
              setValState({
                ...valState,
                val1: val,
              })
            }}
          />
        </GroupSection>
        <GroupSection title='步进器状态'>
          <View style={{ marginBottom: Taro.pxTransform(32) }}>
            <StepperSample title='初始状态'>
              <HuiStepper
                type='number'
                value={valState.val2}
                min={0}
                disabledInput
                hideMinus
                onChange={val => {
                  setValState({
                    ...valState,
                    val2: val,
                  })
                }}
              />
            </StepperSample>
            <StepperSample title='双项可点击'>
              <HuiStepper
                type='number'
                value={valState.val3}
                min={0}
                disabledInput
                hideMinus
                onChange={val => {
                  setValState({
                    ...valState,
                    val3: val,
                  })
                }}
              />
            </StepperSample>
          </View>
          <View>
            <StepperSample title='双项不可点击'>
              <HuiStepper
                type='number'
                value={valState.val4}
                min={9999}
                max={9999}
                disabledInput
                disabled
                onChange={val => {
                  setValState({
                    ...valState,
                    val4: val,
                  })
                }}
              />
            </StepperSample>
            <StepperSample title='单项不可点击'>
              <HuiStepper
                type='number'
                value={valState.val5}
                min={0}
                max={9999}
                disabledInput
                onChange={val => {
                  setValState({
                    ...valState,
                    val5: val,
                  })
                }}
              />
            </StepperSample>
            <StepperSample title=''>
              <HuiStepper
                type='number'
                value={valState.val6}
                min={99}
                max={9999}
                disabledInput
                onChange={val => {
                  setValState({
                    ...valState,
                    val6: val,
                  })
                }}
              />
            </StepperSample>
          </View>
        </GroupSection>
      </View>
    </View>
  )
}

export default Stepper
