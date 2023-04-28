import React, { useState } from 'react'
import { View } from '@tarojs/components'

import HuiIcon from '@/components/Icon'
import HuiTabs from '@/components/Tabs'
import PageHeader from '@/demoComponents/PageHeader'
import SubGroupSection from '@/demoComponents/SubGroupSection'
import { HIconType } from '@/components/Icon/type'
import HuiBadge from '@/components/Badge'

import './Icon.scss'

const { HuiTab } = HuiTabs

const IconSample: React.FC<{
  title: HIconType
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='icon-sample'>
    <View className='content'>{children}</View>
    <View className='title'>{title}</View>
  </View>
)

const IconPage: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  return (
    <View className='icon-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-desigin-icon-21053101.png'
        title='图标Icon'
        desc='图标的主要目的是快速传达概念，因此需要易于理解，尽量在不同文化、不同年纪和不同背景下的情况下也很普遍，让使用者与之共鸣'
      />
      <View className='content'>
        <HuiTabs active={activeTabIndex} shadow={false} style={{ background: 'none' }} onChange={index => setActiveTabIndex(Number(index))}>
          <HuiTab title='案例展示'>
            <View className='tab-container no-flex'>
              <SubGroupSection title='Icon基础用法'>
                <View className='inline-item'>
                  <HuiIcon name='008-likecircle' size={32} />
                </View>
                <View className='inline-item'>
                  <HuiIcon name='019-image' size={32} />
                </View>
              </SubGroupSection>

              <SubGroupSection title='Icon增加提示'>
                <View className='inline-item'>
                  <HuiBadge dot>
                    <HuiIcon name='002-comments' size={32} />
                  </HuiBadge>
                </View>
                <View className='inline-item'>
                  <HuiBadge value={3}>
                    <HuiIcon name='002-comments' size={32} />
                  </HuiBadge>
                </View>
                <View className='inline-item'>
                  <HuiBadge value={1000}>
                    <HuiIcon name='002-comments' size={32} />
                  </HuiBadge>
                </View>
              </SubGroupSection>

              <SubGroupSection title='Icon自定义颜色'>
                <View className='inline-item'>
                  <HuiIcon name='002-comments' size={32} color='#ff6c00' />
                </View>
                <View className='inline-item'>
                  <HuiIcon name='020-couponscirde' size={32} color='#ed3737' />
                </View>
              </SubGroupSection>

              <SubGroupSection title='Icon自定义大小'>
                <View className='inline-item'>
                  <HuiIcon name='008-likecircle' size={32} />
                </View>
                <View className='inline-item'>
                  <HuiIcon name='008-likecircle' size={46} />
                </View>
              </SubGroupSection>
            </View>
          </HuiTab>
          <HuiTab title='线框风格'>
            <View className='tab-container'>
              <IconSample title='001-close'>
                <HuiIcon name='001-close' size={32} />
              </IconSample>
              <IconSample title='002-warnings'>
                <HuiIcon name='002-warnings' size={32} />
              </IconSample>
              <IconSample title='002-comments'>
                <HuiIcon name='002-comments' size={32} />
              </IconSample>
              <IconSample title='004-pluscirde'>
                <HuiIcon name='004-pluscirde' size={32} />
              </IconSample>
              <IconSample title='008-remove'>
                <HuiIcon name='008-remove' size={32} />
              </IconSample>
              <IconSample title='006-scan'>
                <HuiIcon name='006-scan' size={32} />
              </IconSample>
              <IconSample title='007-qrcode'>
                <HuiIcon name='007-qrcode' size={32} />
              </IconSample>
              <IconSample title='008-likecircle'>
                <HuiIcon name='008-likecircle' size={32} />
              </IconSample>
              <IconSample title='009-checkcircle'>
                <HuiIcon name='009-checkcircle' size={32} />
              </IconSample>
              <IconSample title='010-hourglass'>
                <HuiIcon name='010-hourglass' size={32} />
              </IconSample>
              <IconSample title='011-left'>
                <HuiIcon name='011-left' size={32} />
              </IconSample>
              <IconSample title='012-right'>
                <HuiIcon name='012-right' size={32} />
              </IconSample>
              <IconSample title='015-searchcircle'>
                <HuiIcon name='015-searchcircle' size={32} />
              </IconSample>
              <IconSample title='016-sharecircle'>
                <HuiIcon name='016-sharecircle' size={32} />
              </IconSample>
              <IconSample title='018-phonecirde'>
                <HuiIcon name='018-phonecirde' size={32} />
              </IconSample>
              <IconSample title='019-image'>
                <HuiIcon name='019-image' size={32} />
              </IconSample>
            </View>
          </HuiTab>
          <HuiTab title='实心风格'>
            <View className='tab-container'>
              <IconSample title='005-close2'>
                <HuiIcon name='005-close2' size={32} />
              </IconSample>
              <IconSample title='067-annotationfill'>
                <HuiIcon name='067-annotationfill' size={32} />
              </IconSample>
              <IconSample title='068-commentsfill'>
                <HuiIcon name='068-commentsfill' size={32} />
              </IconSample>
              <IconSample title='063-zaihuilogo'>
                <HuiIcon name='063-zaihuilogo' size={32} />
              </IconSample>
              <IconSample title='070-minusfill'>
                <HuiIcon name='070-minusfill' size={32} />
              </IconSample>
              <IconSample title='065-wechat'>
                <HuiIcon name='065-wechat' size={32} />
              </IconSample>
              <IconSample title='076-starfill'>
                <HuiIcon name='076-starfill' size={32} />
              </IconSample>
              <IconSample title='064-likefill'>
                <HuiIcon name='064-likefill' size={32} />
              </IconSample>
              <IconSample title='071-checkcfill'>
                <HuiIcon name='071-checkcfill' size={32} />
              </IconSample>
              <IconSample title='062-empty'>
                <HuiIcon name='062-empty' size={32} />
              </IconSample>
              <IconSample title='075-hartfill'>
                <HuiIcon name='075-hartfill' size={32} />
              </IconSample>
              <IconSample title='086-giftfill'>
                <HuiIcon name='086-giftfill' size={32} />
              </IconSample>
              <IconSample title='072-searchfill'>
                <HuiIcon name='072-searchfill' size={32} />
              </IconSample>
              <IconSample title='079-sharefill'>
                <HuiIcon name='079-sharefill' size={32} />
              </IconSample>
              <IconSample title='074-phonefill'>
                <HuiIcon name='074-phonefill' size={32} />
              </IconSample>
              <IconSample title='091-carfill'>
                <HuiIcon name='091-carfill' size={32} />
              </IconSample>
            </View>
          </HuiTab>
        </HuiTabs>
      </View>
    </View>
  )
}

export default IconPage
