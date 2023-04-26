import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperItem, View } from '@tarojs/components'

import HuiGrid from '@/components/Grid'
import { selectorQueryClientRect } from '@/utils'
import HuiSwiperIndicator from '@/components/SwiperIndicator/SwiperIndicator'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'
import SubGroupSection from '@/demoComponents/SubGroupSection'

import './Grid.scss'

const HuiGridItem = HuiGrid.Item

const GridDemoPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const fn = async () => {
      // 通过ref来拿到
      const res = await selectorQueryClientRect(`#${ref?.current?.uid}`)
      setHeight(res?.height)
    }
    fn()
  })

  // #region demo
  return (
      <View className='grid-page'>
        <PageHeader
          image='https://r.kezaihui.com/client/2021-05-28/hui-design-grid-21052801.png'
          title='宫格导航Grid'
          desc='用于标记元素的属性和维度或分类，可自定义圆角大小、颜色'
        />

        <View className='content'>
          <GroupSection title='导航类型'>
            <SubGroupSection title='单行类型'>
              <View className='sample-item'>
                <HuiGrid columnNum={1}>
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧新品' />
                </HuiGrid>
              </View>
              <View className='sample-item'>
                <HuiGrid columnNum={2}>
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧新品' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='今日爆款' />
                </HuiGrid>
              </View>
              <View className='sample-item'>
                <HuiGrid columnNum={3}>
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧新品' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='今日爆款' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧国际' />
                </HuiGrid>
              </View>
              <View className='sample-item'>
                <HuiGrid columnNum={4}>
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧新品' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='今日爆款' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧国际' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧烤肉' />
                </HuiGrid>
              </View>
              <View className='sample-item'>
                <HuiGrid columnNum={5}>
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧新品' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='今日爆款' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧国际' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧烤肉' />
                  <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧超市' />
                </HuiGrid>
              </View>
            </SubGroupSection>

            <SubGroupSection title='多行类型'>
              <HuiSwiperIndicator activeColor='#ED3737' style={{ bottom: 12 }}>
                <Swiper style={{ height, paddingBottom: 20, background: '#fff' }}>
                  <SwiperItem>
                    <HuiGrid ref={ref}>
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧新品惠吧新品' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='今日爆款今日' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧国际' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧烤肉' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧超市' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='充值中心' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='机票酒店' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='金币庄园' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='再惠拍卖' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='红坊吃货' />
                    </HuiGrid>
                  </SwiperItem>
                  <SwiperItem>
                    <HuiGrid>
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='分类' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='惠吧美食' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='再惠健康' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='口碑生活' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='红坊' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='会员中心' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='造点新货' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='土货鲜食' />
                    </HuiGrid>
                  </SwiperItem>
                  <SwiperItem>
                    <HuiGrid>
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='美食 ' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='美团超市' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='生鲜果蔬' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='美团专送' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='快食简餐' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='午餐优选' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='甜点饮品' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='家常菜' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='小吃馆' />
                      <HuiGridItem image='https://r.kezaihui.com/client/2021-06-04/hui-design-gridplaceholder-21060401.png' text='鲜花蛋糕' />
                    </HuiGrid>
                  </SwiperItem>
                </Swiper>
              </HuiSwiperIndicator>
            </SubGroupSection>
          </GroupSection>
        </View>
      </View>
  )
// #endregion demo
}
export default GridDemoPage
