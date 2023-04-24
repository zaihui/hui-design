import React from 'react'
import { View } from '@tarojs/components'

import HuiBadge from '@/components/Badge'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import HuiIcon from '@/components/Icon'

import './Badge.scss'

const SampleItem: React.FC<{
  title?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}> = ({ title, style, children }) => (
  <View className='sample-item' style={style}>
    {title && <View className='si-title'>{title}</View>}
    {children && <View className='si-content'>{children}</View>}
  </View>
)

const BadgePage: React.FC = () => (
    <View className='badge-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-badge-21053101.png'
        title='徽标Badge'
        desc='用于标记元素的属性和维度或分类，可自定义颜色'
      />
      <View className='content'>
        <GroupSection title='徽标类型'>
          <SampleItem title='小红点徽标' style={{ width: '25%' }}>
            <HuiBadge dot>
              <HuiIcon name='002-comments' size={32} />
            </HuiBadge>
          </SampleItem>
          <SampleItem title='计数徽标' style={{ width: '40%' }}>
            <View className='item'>
              <HuiBadge value={3}>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
            <View className='item'>
              <HuiBadge value={1000}>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
          </SampleItem>
          <SampleItem title='文字徽标' style={{ width: '33%' }}>
            <HuiBadge value='NEW'>
              <HuiIcon name='002-comments' size={32} />
            </HuiBadge>
          </SampleItem>
        </GroupSection>
        <GroupSection title='计数徽标样式'>
          <SampleItem title='实心徽标'>
            <View className='item'>
              <HuiBadge value={3}>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
            <View className='item'>
              <HuiBadge value={1000}>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
          </SampleItem>
          <SampleItem title='空心徽标'>
            <View className='item'>
              <HuiBadge value={3} type='hollow'>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
            <View className='item'>
              <HuiBadge value={1000} type='hollow'>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
          </SampleItem>
        </GroupSection>
        <GroupSection title='文字徽标'>
          <SampleItem title='实心徽标'>
            <View className='item'>
              <HuiBadge value='NEW'>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
            <View className='item'>
              <HuiBadge value='最近上新'>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
          </SampleItem>
          <SampleItem title='空心徽标'>
            <View className='item'>
              <HuiBadge value='NEW' type='hollow'>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
            <View className='item'>
              <HuiBadge value='最近上新' type='hollow'>
                <HuiIcon name='002-comments' size={32} />
              </HuiBadge>
            </View>
          </SampleItem>
        </GroupSection>
      </View>
    </View>
)

export default BadgePage
