import React from 'react'
import { View } from '@tarojs/components'

import HuiAvatar from '@/components/Avatar'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Avatar.scss'

const SampleItem: React.FC<{
  title?: string
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='sample-item'>
    {title && <View className='si-title'>{title}</View>}
    {children && <View className='si-content'>{children}</View>}
  </View>
)

const AVATAR_BG_IMG = 'https://r.kezaihui.com/client/2021-05-30/hui-design-avartar-demo-21053001.png'
const AVATAR_USER_IMG = 'https://r.kezaihui.com/client/2021-05-30/hui-design-avatar-user-21053001.png'

const ImagePage: React.FC = () => (
  <View className='avatar-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-05-30/hui-design-avatar-21053001.png'
      title='头像Avatar'
      desc='规范商户/用户头像，支持自定义边框和大小'
    />
    <View className='content'>
      <GroupSection title='头像类型'>
        <SampleItem title='商户头像'>
          <HuiAvatar src={AVATAR_BG_IMG} type='square' />
        </SampleItem>
        <SampleItem title='用户头像'>
          <HuiAvatar src={AVATAR_USER_IMG} type='circle' size='small' />
        </SampleItem>
      </GroupSection>

      <GroupSection title='头像样式'>
        <View className='row'>
          <SampleItem title='基础商户头像'>
            <HuiAvatar src={AVATAR_BG_IMG} type='square' size='medium' />
          </SampleItem>
          <SampleItem title='带边框的商户头像'>
            <HuiAvatar src={AVATAR_BG_IMG} type='square' size='medium' borderColor='#198bff' />
          </SampleItem>
        </View>
        <View>
          <SampleItem title='基础用户头像'>
            <HuiAvatar src={AVATAR_USER_IMG} type='circle' size='medium' />
          </SampleItem>
          <SampleItem title='带边框的用户头像'>
            <HuiAvatar src={AVATAR_USER_IMG} type='circle' size='medium' borderColor='#198bff' />
          </SampleItem>
        </View>
      </GroupSection>
      <GroupSection title='头像大小'>
        <View className='row'>
          <SampleItem title='大号商户头像'>
            <HuiAvatar src={AVATAR_BG_IMG} type='square' size='large' />
          </SampleItem>
          <SampleItem title='中号商户头像'>
            <HuiAvatar src={AVATAR_BG_IMG} type='square' size='medium' />
          </SampleItem>
          <SampleItem title='小号商户头像'>
            <HuiAvatar src={AVATAR_BG_IMG} type='square' size='small' />
          </SampleItem>
        </View>
        <View className='row'>
          <SampleItem title='大号用户头像'>
            <HuiAvatar src={AVATAR_USER_IMG} type='circle' size='large' />
          </SampleItem>
          <SampleItem title='中号用户头像'>
            <HuiAvatar src={AVATAR_USER_IMG} type='circle' size='medium' />
          </SampleItem>
          <SampleItem title='小号用户头像'>
            <HuiAvatar src={AVATAR_USER_IMG} type='circle' size='small' />
          </SampleItem>
        </View>
      </GroupSection>
    </View>
  </View>
)
export default ImagePage
