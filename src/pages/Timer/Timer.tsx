import React from 'react'
import { View } from '@tarojs/components'
import cx from 'classnames'

import HuiTimer from '@/components/Timer'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Timer.scss'

const TIMER_NUM = 1000 * 24 * 60 * 60 * 1000
const TIME_FULL_FORMAT = 'DD天HH时mm分ss秒'
const TIME_FORMAT = 'HH时mm分ss秒'

interface TimerPageItemProps {
  name?: string
  isGrey?: boolean
  children?: React.ReactNode
}

const TimerPageItem: React.FC<TimerPageItemProps> = props => {
  const { name, isGrey = false, children } = props
  return (
    <View className={cx('timer-page-item', { 'is-grey': isGrey })}>
      {name && <View className='title'>{name}</View>}
      <View className='content'>{children}</View>
    </View>
  )
}

const Timer: React.FC = () => (
  <View className='timer-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-07-21/hui-design-timer-21072101.png'
      title='计时器Timer'
      desc='给事件记录时间或倒计时'
    />
    <View className='content'>
      <GroupSection title='计时器类型'>
        <TimerPageItem name='卡片计时器' isGrey>
          <HuiTimer
            isCard
            isShowDay
            time={TIMER_NUM}
          />
          <HuiTimer
            isCard
            time={TIMER_NUM}
          />
        </TimerPageItem>
        <TimerPageItem name='文字计时器'>
          <HuiTimer
            isShowDay
            time={TIMER_NUM}
          />
          <HuiTimer
            time={TIMER_NUM}
          />
        </TimerPageItem>
      </GroupSection>
      <GroupSection title='计时器样式'>
        <TimerPageItem isGrey>
          <HuiTimer
            isCard
            isShowDay
            time={TIMER_NUM}
            format={TIME_FULL_FORMAT}
          />
          <HuiTimer
            isCard
            time={TIMER_NUM}
            format={TIME_FORMAT}
          />
        </TimerPageItem>
        <TimerPageItem>
          <HuiTimer
            isShowDay
            time={TIMER_NUM}
            format={TIME_FULL_FORMAT}
          />
          <HuiTimer
            time={TIMER_NUM}
            format={TIME_FORMAT}
          />
        </TimerPageItem>
      </GroupSection>
    </View>
  </View>
)

export default Timer
