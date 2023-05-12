import React from 'react'
import { View, Text } from '@tarojs/components'

import PageHeader from '@/demoComponents/PageHeader'

import './Color.scss'

const COLORS = [
  { color: '#1E1E1E', type: '中性色', name: 'Gray-1', desc: '用于标题等重要文字', valueColor: '#fff', nameColor: '#8e8e8e', descColor: '#fff' },
  { color: '#575757', type: '中性色', name: 'Gray-2', desc: '用于正文等文字', valueColor: '#fff', nameColor: '#8e8e8e', descColor: '#fff' },
  { color: '#8E8E8E', type: '中性色', name: 'Gray-3', desc: '用于描述等辅助性文字', valueColor: '#fff', nameColor: '#1e1e1e', descColor: '#fff' },
  { color: '#B1B1B1', type: '中性色', name: 'Gray-4', desc: '用于占位文字颜色', valueColor: '#fff', nameColor: '#8e8e8e', descColor: '#fff' },
  { color: '#C7C7C7', type: '中性色', name: 'Gray-5', desc: '用于边框颜色', valueColor: '#8e8e8e', nameColor: '#8e8e8e', descColor: '#8e8e8e' },
  { color: '#EDEDED', type: '中性色', name: 'Gray-6', desc: '用于—颜色', valueColor: '#8e8e8e', nameColor: '#8e8e8e', descColor: '#8e8e8e' },
  { color: '#F8F8F8', type: '中性色', name: 'Gray-7', desc: '用于禁用、分割线、背景色等', valueColor: '#8e8e8e', nameColor: '#8e8e8e', descColor: '#8e8e8e' },
  { color: '#FFFFFF', type: '中性色', name: 'Gray-8', desc: '用于深色背景上文字颜色、卡片色等', valueColor: '#8e8e8e', nameColor: '#8e8e8e', descColor: '#8e8e8e' },
  { color: '#FF6C00', type: '中性色', name: 'Orange-1', desc: '配合品牌色使用，用于次要按钮底色等', valueColor: '#fff', nameColor: '#fff', descColor: '#fff' },
  { color: '#00C968', type: '中性色', name: 'Green-1', desc: '表示成功含义', valueColor: '#fff', nameColor: '#fff', descColor: '#fff' },
  { color: '#FFC82C', type: '中性色', name: 'Amber-1', desc: '表示警告含义', valueColor: '#fff', nameColor: '#fff', descColor: '#fff' },
  { color: '#ED3737', type: '中性色', name: 'Red-1', desc: '表示错误含义', valueColor: '#fff', nameColor: '#fff', descColor: '#fff' },
]

const Color: React.FC = () => (
    <View className='color-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-31/hui-design-color-21053101.png'
        title='颜色Color'
        desc='规范组件中颜色使用，统一视觉表现，减少不必要的颜色样式'
      />

      <View className='content'>
        {COLORS.map(colorData => (
          <View
            key={colorData.name}
            className='color-item'
            style={{ backgroundColor: colorData.color }}
          >
            <View className='top'>
              <Text
                className='color-value'
                style={{ color: colorData.valueColor }}
              >
                {colorData.type}: {colorData.color}
              </Text>
              <Text
                className='color-name'
                style={{ color: colorData.nameColor }}
              >
                {colorData.name}
              </Text>
            </View>
            <View
              className='color-desc'
              style={{ color: colorData.descColor }}
            >
              {colorData.desc}
            </View>
          </View>
        ))}
      </View>
    </View>
)

export default Color
