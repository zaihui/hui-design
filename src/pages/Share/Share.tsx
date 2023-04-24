import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { useShareAppMessage } from '@tarojs/taro'

import HuiShare from '@/components/Share'
import HuiButton from '@/components/Button'
import PageHeader from '@/demoComponents/PageHeader'
import GroupSection from '@/demoComponents/GroupSection'

import './Share.scss'

const IMAGE = 'https://r.kezaihui.com/client/2021-07-22/hui-design-share-demo-2021072201.png'

const ShareDemoPage: React.FC = () => {
  const [singleShareVisible, setSingleShareVisible] = useState(false)
  const [multipleShareVisble, setMultipleShareVisble] = useState(false)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([''])

  const handleShowShare = (isSingle = true) => {
    if (isSingle) {
      setSingleShareVisible(true)
    } else {
      setMultipleShareVisble(true)
    }
    setLoading(true)
    Taro.getImageInfo({ src: IMAGE }).then(res => setImages(Array(4).fill(0).map(() => res.path)))
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }

  const handleRefuse = () => {
    Taro.showToast({
      title: '未授权',
    })
  }

  useShareAppMessage(() => {
    if (!images[0]) return {}
    return {
      title: '转发',
      imageUrl: images[0],
    }
  })

  return (
    <View className='share-page'>
      <PageHeader
        image='https://r.kezaihui.com/client/2021-07-21/hui-design-share-21072102.png'
        title='分享Share'
        desc='用于信息分享'
      />
      <View className='content'>
        <GroupSection title='分享类型'>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => handleShowShare()}>单张海报分享</HuiButton>
          </View>
          <View className='item'>
            <HuiButton block type='secondary' onClick={() => handleShowShare(false)}>多张海报分享</HuiButton>
          </View>
        </GroupSection>
      </View>
      <HuiShare
        loading={loading}
        visible={singleShareVisible}
        url={images.slice(0, 1)}
        onClose={() => {
          setSingleShareVisible(false)
          setImages([''])
        }}
        onRefuseWritePhotosAlbum={handleRefuse}
      />
      <HuiShare
        loading={loading}
        url={images}
        multiple
        visible={multipleShareVisble}
        onClose={() => {
          setMultipleShareVisble(false)
          setImages([''])
        }}
        onRefuseWritePhotosAlbum={handleRefuse}
      />
    </View>
  )
}

export default ShareDemoPage
