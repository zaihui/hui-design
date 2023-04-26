import React, { useState } from 'react'
import { View, Block } from '@tarojs/components'

import HuiDialog from '@/components/Dialog'
import HuiIcon from '@/components/Icon'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Dialog.scss'

const MOCK_IMAGE = 'https://s3.cn-north-1.amazonaws.com.cn/media.zaihuiba.com/campaign_pics/003f28c06d9d47ac82b4723e69e7e8f8.jpeg'

const DialogDemoPage: React.FC = () => {
  const [simpleDialogVisible, setSimpleDialogVisible] = useState(false)
  const [imageDialogVisible, setImageDialogVisible] = useState(false)
  const [bottomCloseDialogVisible, setBottomCloseDialogVisible] = useState(false)
  const [maxHeightDialogVisible, setMaxHeightDialogVisble] = useState(false)
  const [iconDialogVisible, setIconDialogVisible] = useState(false)
  const [defaultBtnWithDescDialogVisible, setDefaultBtnWithDescDialogVisible] = useState(false)

  return (
    <View className='dialog-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-05-27/hui-design-dialog-21052701.png'
        title='对话框Dialog'
        desc='用于用户处理事务，又不希望跳转页面以致打断工作流程时'
      />
      <View className='content'>
        <GroupSection title='对话框类型'>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => setSimpleDialogVisible(true)}>基本用法</HuiButton>
          </View>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => setMaxHeightDialogVisble(true)}>内容溢出对话框</HuiButton>
          </View>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => setBottomCloseDialogVisible(true)}>关闭在下方的对话框</HuiButton>
          </View>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => setIconDialogVisible(true)}>有icon的对话框</HuiButton>
          </View>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => setImageDialogVisible(true)}>有图片的对话框</HuiButton>
          </View>
          <View className='item' onClick={() => setDefaultBtnWithDescDialogVisible(true)}>
            <HuiButton block type='secondary' onClick={() => setDefaultBtnWithDescDialogVisible(true)}>
              两个按钮带描述文案的对话框
            </HuiButton>
          </View>
        </GroupSection>
      </View>

      <HuiDialog
        visible={simpleDialogVisible}
        title='基本用法'
        content='顾客消费的时候，如果已经消费较多金额，此时可按设定给顾客推荐一个储值活动，一来便于商户资金回流，二来没用完的储值还可以让顾客回头消费。'
        onClose={() => setSimpleDialogVisible(false)}
        renderFooter={(
          <Block>
            <View className='btn'>
              <HuiButton size='large' block onClick={() => setSimpleDialogVisible(false)}>确定</HuiButton>
            </View>
            <View className='btn'>
              <HuiButton size='large' block type='secondary' onClick={() => setSimpleDialogVisible(false)}>取消</HuiButton>
            </View>
          </Block>
        )}
      />

      <HuiDialog
        visible={imageDialogVisible}
        title='带图片的弹窗'
        content='这一条的内容很简短'
        image={MOCK_IMAGE}
        closable={false}
        renderFooter={<HuiButton size='large' block onClick={() => setImageDialogVisible(false)}>好的</HuiButton>}
        onClose={() => setImageDialogVisible(false)}
      />

      <HuiDialog
        visible={bottomCloseDialogVisible}
        title='底部关闭'
        content='关闭按钮在底部'
        closeType='bottom'
        onClose={() => setBottomCloseDialogVisible(false)}
      />

      <HuiDialog
        visible={maxHeightDialogVisible}
        title='超长内容'
        content='秋天的后半夜，月亮下去了，太阳还没有出，只剩下一片乌蓝的天;除了夜游的东西，什么都睡着。
        华老栓忽然坐起身，擦着火柴，点上遍身油腻的灯盏，茶馆的两间屋子里，便弥满了青白的光。
        “小栓的爹，你就去么?”是一个老女人的声音。里边的小屋子里，也发出一阵咳嗽。
        “唔。”老栓一面听，一面应，一面扣上衣服;伸手过去说，“你给我罢。”
        华大妈在枕头底下掏了半天，掏出一包洋钱，交给老栓，老栓接了，抖抖的装入衣袋，又在外面按了两下;
        便点上灯笼，吹熄灯盏，走向里屋子去了。那屋子里面，正在窸窸窣窣的响，接着便是一通咳嗽。老栓候他平静下去，才低低的叫道，
        “小栓……你不要起来。……店么? 你娘会安排的。”
        老栓听得儿子不再说话，料他安心睡了;便出了门，走到街上。街上黑沉沉的一无所有，只有一条灰白的路，看得分明。灯光照着他的两脚，
        一前一后的走。有时也遇到几只狗，可是一只也没有叫。天气比屋子里冷得多了;老栓倒觉爽快，仿佛一旦变了少年，得了神通，
        有给人生命的本领似的，跨步格外高远。而且路也愈走愈分明，天也愈走愈亮了。
        老栓正在专心走路，忽然吃了一惊，远远里看见一条丁字街，明明白白横着。他便退了几步，寻到一家关着门的铺子，蹩进檐下，靠门立住了。好一会，身上觉得有些发冷。'
        renderFooter={(
          <HuiButton size='large' block onClick={() => setMaxHeightDialogVisble(false)}>知道了</HuiButton>
        )}
        onClose={() => setMaxHeightDialogVisble(false)}
      />

      <HuiDialog
        visible={iconDialogVisible}
        title='有icon的弹窗'
        content='顶部展示图标'
        renderIcon={<HuiIcon name='002-warnings' color='red' size={36} />}
        onClose={() => setIconDialogVisible(false)}
      />

      <HuiDialog
        visible={defaultBtnWithDescDialogVisible}
        title='默认双按钮带描述文字'
        content='我的内容呢，刚才还有呢'
        onClose={() => setDefaultBtnWithDescDialogVisible(false)}
        renderFooter={(
          <Block>
            <View className='btn'>
              <HuiButton size='large' block onClick={() => setDefaultBtnWithDescDialogVisible(false)}>
                确定
              </HuiButton>
            </View>
            <View className='btn'>
              <HuiButton size='large' block type='secondary' onClick={() => setDefaultBtnWithDescDialogVisible(false)}>
                取消
              </HuiButton>
            </View>
            <View className='desc'>简单的描述文字</View>
          </Block>
        )}
      />
    </View>
  )
}

export default DialogDemoPage
