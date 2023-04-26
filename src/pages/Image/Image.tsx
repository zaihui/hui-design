import React from 'react'
import { View } from '@tarojs/components'

import HuiImage from '@/components/Image'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import './Image.scss'

const SampleItem: React.FC<{
  title?: string
  children?: React.ReactNode
}> = ({ title, children }) => (
  <View className='sample-item'>
    {title && <View className='si-title'>{title}</View>}
    {children && <View className='si-content'>{children}</View>}
  </View>
)

const RECTANGLE_IMG = 'https://r.kezaihui.com/client/2021-05-31/hui-design-image-1-21053101.png'
const FULL_IMG = 'https://r.kezaihui.com/client/2021-05-31/hui-design-image-3-21053101.png'
const FULL_IMG2 = 'https://r.kezaihui.com/client/2021-05-31/hui-design-image-2-21053101.png'
const FULL_IMG3 = 'https://r.kezaihui.com/client/2021-05-31/hui-design-image-4-21053101.png'

const ImagePage: React.FC = () => (
  <View className='image-page'>
    <PageHeader
      image='https://r.kezaihui.com/client/2021-05-31/hui-design-image-21053101.png'
      title='图片Image'
      desc='需要展示图片、图片加载、出错时使用，支持自定义尺寸和默认logo'
    />
    <View className='content'>
      <GroupSection title='常用图片比例'>
        <SampleItem title='16:9'>
          <HuiImage width={160} height={90} src={RECTANGLE_IMG} mode='aspectFill' />
        </SampleItem>
        <SampleItem title='3:2'>
          <HuiImage width={160} height={160.67} src={RECTANGLE_IMG} mode='aspectFill' />
        </SampleItem>
        <SampleItem title='4:3'>
          <HuiImage width={160} height={120} src={RECTANGLE_IMG} mode='aspectFill' />
        </SampleItem>
        <SampleItem title='1:1'>
          <HuiImage width={160} height={160} src={RECTANGLE_IMG} mode='aspectFill' />
        </SampleItem>
        <SampleItem title='3:4'>
          <HuiImage width={160} height={213.33} src={RECTANGLE_IMG} mode='aspectFill' />
        </SampleItem>
        <SampleItem title='2:3'>
          <HuiImage width={160} height={240} src={RECTANGLE_IMG} mode='aspectFill' />
        </SampleItem>
      </GroupSection>

      <GroupSection title='图片状态'>
        <SubGroupSection title='默认图片'>
          <SampleItem>
            <HuiImage width={80} height={80} src='' />
          </SampleItem>
          <SampleItem>
            <HuiImage width={160} height={90} src='' />
          </SampleItem>
        </SubGroupSection>
        <SubGroupSection title='加载中的图片'>
          <SampleItem>
            <View className='fake-image'>
              加载中…
            </View>
          </SampleItem>
          <SampleItem>
            <View className='fake-image large'>
              <View className='placeholder-block' />
              加载中…
            </View>
          </SampleItem>
        </SubGroupSection>
        <SubGroupSection title='图片加载失败'>
          <SampleItem>
            <HuiImage width={160} height={90} src='http://xxx' />
          </SampleItem>
        </SubGroupSection>
      </GroupSection>
      <GroupSection title='图片填充方式'>
        <SampleItem title='等比例优先满足宽度(裁剪)'>
          <HuiImage src={FULL_IMG2} mode='widthFix' width={160} height={90} />
        </SampleItem>
        <SampleItem title='等比例优先满足高度(不裁剪)'>
          <HuiImage src={FULL_IMG2} mode='aspectFit' width={128} height={89} />
        </SampleItem>
        <SampleItem title='等比例优先满足高度(裁剪)'>
          <HuiImage src={FULL_IMG3} mode='heightFix' width={160} height={90} />
        </SampleItem>
        <SampleItem title='等比例优先满足宽度(不裁剪)'>
          <HuiImage src={FULL_IMG3} mode='aspectFit' width={160} height={71} />
        </SampleItem>
        <SampleItem title='等比例优先满足高度(不裁剪)'>
          <HuiImage src={FULL_IMG} mode='aspectFit' width={100} height={100} style={{ borderRadius: '50%' }} />
        </SampleItem>
        <SampleItem title='等比例优先满足宽度(裁剪)'>
          <HuiImage src={FULL_IMG} mode='widthFix' width={100} height={100} style={{ borderRadius: '50%' }} />
        </SampleItem>
      </GroupSection>
    </View>
  </View>
)
export default ImagePage
