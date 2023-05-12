import React from 'react'
import { View, Text } from '@tarojs/components'
import PageHeader from '@/demoComponents/PageHeader'

import GroupSection from '@/demoComponents/GroupSection'

import HighlightText from '@zaihui/hui-design/src/components/HighlightText'

import './HighlightText.scss'

const FooterDemoPage: React.FC = () => (
  <View className='hight-light-text-demo-page'>
    <PageHeader
      title='高亮文本'
      desc='高亮文本是为了对文本中的一些关键字高亮展示'
    />
    <View className='content'>
      <GroupSection title='单行文本和修改关键字颜色'>
        <HighlightText keyword='技术' keywordStyle={{ color: 'red' }}>
          再惠提供技术支持
        </HighlightText>
      </GroupSection>
      <GroupSection title='嵌套文本'>
        <HighlightText keyword='技术'>
          <View>
            再惠提供技术支持、再惠提供技术支持<Text>再惠提供技术支持</Text>
          </View>
          <View>
            再惠提供技术支持<View>再惠提供技术支持</View>
          </View>
          <View>
            再惠提供技术支持<Text>再惠提供技术支持</Text>
          </View>
          <View>
            再惠提供技术支持<View>再惠提供技术支持</View>
          </View>
          <View>
            再惠提供技术支持<View>再惠提供技术支持</View>
          </View>
          <View>再惠提供技术支持</View>
        </HighlightText>
      </GroupSection>
    </View>
  </View>
)

export default FooterDemoPage
