import React, { useState } from 'react'
import { View, Block, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { pxTransform } from '../../utils'
import HuiPopup from '../Popup'
import HuiIcon from '../Icon'
import HuiButton from '../Button'
import HuiImage from '../Image'
import ShareSwiper from './ShareSwiper'

import './Share.scss'

const COLORS = {
  GREEN: '#09BB07',
  ORANGE: '#FF8F33',
}

const LOADER_URL = 'https://r.kezaihui.com/loading-storehome-20191120001.gif'

export interface HuiShareProps {
  loading?: boolean
  url?: string[]
  multiple?: boolean
  visible?: boolean
  style?: React.CSSProperties
  className?: string
  onClose?: () => void
  onRefuseWritePhotosAlbum?: () => void
}

const HuiShare: React.FC<HuiShareProps> = props => {
  const {
    url,
    loading,
    multiple = false,
    visible = false,
    style,
    className = '',
    onClose = () => 0,
    onRefuseWritePhotosAlbum = () => 0,
  } = props
  const [currentPostIndex, setCurrentPostIndex] = useState(0)

  const handleClickSave = () => {
    Taro.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          // 未授权过写入相册权限时
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              savePostToAlbum()
            },
            fail() {
              Taro.showToast({
                title: '保存失败',
              })
            },
          })
        } else if (!res.authSetting['scope.writePhotosAlbum']) {
          // 拒绝过写入相册权限时
          onRefuseWritePhotosAlbum()
        } else {
          // 同意授权时
          savePostToAlbum()
        }
      },
    })
  }

  const savePostToAlbum = async () => {
    if (!url) return
    await Taro.showLoading({
      title: '保存中…',
      mask: true,
    })
    await Taro.saveImageToPhotosAlbum({
      filePath: multiple ? url?.[currentPostIndex] : url?.[0],
      success: () => {
        setTimeout(() => {
          Taro.showToast({
            title: '海报已保存至手机相册',
            icon: 'success',
            duration: 2000,
          })
        }, 100)
      },
      fail: () => {
        setTimeout(() => {
          Taro.showToast({
            title: '保存失败',
            duration: 2000,
          })
        }, 100)
      },
    })
    await Taro.hideLoading()
  }

  const renderSingleContent = () => (
    <View className='hui-share-content'>
      {url?.[0] && (
        <HuiImage
          mode='aspectFill'
          src={url?.[0]}
          className='hui-share-img'
          width={260}
          height={360}
        />
     )}
    </View>
  )

  const renderMultipleContent = () => (
    <View className='hui-share-multiple-content'>
      {visible && !!url && !!url.filter(v => !!v).length && (
        <ShareSwiper urlList={url} handleChange={index => setCurrentPostIndex(index)} />
      )}
    </View>
  )

  return (
    <View>
      <HuiPopup
        position='bottom'
        visible={visible}
        className={className}
        style={{ borderRadius: `${pxTransform(24)} ${pxTransform(24)} 0 0`, overflow: 'hidden', ...style }}
        onClose={onClose}
      >
        <View className='hui-share'>
          <View className='hui-share-header'>
            <HuiIcon
              name='006-close3'
              size={20}
              color='rgba(30, 30, 30, .5)'
              onClick={onClose}
            />
          </View>
          {loading ? (
            <View className='loading-content'>
              <Image src={LOADER_URL} className='loading-image' />
              <View className='loading-tip'>加载中…</View>
            </View>
          ) : (
            <Block>
              {multiple ? renderMultipleContent() : renderSingleContent()}
            </Block>
          )}
          <View className='hui-share-btn-group'>
            <HuiButton openType='share' type='text' disabled={loading}>
              <Block>
                <HuiIcon name='065-wechat' size={52} color={COLORS.GREEN} />
                <View className='title'>推荐好友</View>
                <View className='tips'>发给微信好友</View>
              </Block>
            </HuiButton>
            <HuiButton type='text' onClick={handleClickSave} disabled={loading}>
              <Block>
                <HuiIcon name='101-downfill' size={52} color={COLORS.ORANGE} />
                <View className='title'>保存海报</View>
                <View className='tips'>发到微信朋友圈</View>
              </Block>
            </HuiButton>
          </View>
        </View>
      </HuiPopup>
    </View>
  )
}

export default HuiShare
