import React, { useEffect, useMemo, useRef, useState } from 'react'
import cx from 'classnames'
import Taro from '@tarojs/taro'

import { ScrollView, View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

import { selectorQueryClientRect } from '../../utils'
import HuiIcon from '../Icon/Icon'
import HuiSticky from '../Sticky/Sticky'

export interface HuiTabsProps extends ViewProps {
  /** 当前选中的标签页的index, 从0开始
   * 若tab指定了name属性的情况下，active的值为当前标签的name
   */
  active: number | string
  /** 是否启动滚动，启动后，部分标签页可能被隐藏 */
  scroll?: boolean
  /** 是否使用动画切换Tab，使用后，Tab容器的高度将保持不变 */
  animated?: boolean
  /** 是否使用微笑样式 */
  smile?: boolean
  /** 是否使用双行标题, 默认为 false */
  hasSubTitle?: boolean
  /** 是否开启阴影，默认开启 */
  shadow?: boolean
  /** 指示器颜色、微笑样式下高亮标签颜色 */
  indicatorColor?: string
  /** 是否使用吸顶效果 */
  sticky?: boolean
  /** 吸顶效果下的offsetTop */
  offsetTop?: number
  /** 自动滚动开启 小程序上可能会有白屏bug 慎用！ */
  autoScroll?: boolean
  style?: React.CSSProperties
  className?: string
  /** 点击标签时触发 */
  onChange?: (i: number | string) => void
}

const defaultProps = {
  onChange: () => undefined,
}

interface ITab {
  title: string
  subTitle?: string
  name: number | string
}

const HuiTabs: React.FC<HuiTabsProps> = (props) => {
  const {
    active,
    scroll = false,
    animated = false,
    smile = false,
    hasSubTitle = false,
    shadow = true,
    onChange = defaultProps.onChange,
    indicatorColor = '',
    sticky = false,
    offsetTop = 0,
    children,
    style = {},
    className = '',
    autoScroll = false,
    ...rest
  } = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tabsRef = useRef<any>()
  const [tabsInfos, setTabsInfos] = useState<
    Taro.NodesRef.BoundingClientRectCallbackResult[]
  >([])
  const [tabsWidth, setTabsWidth] = useState<number>(0)

  const [defaultTabInfo] = useState({
    width: 0,
    left: 0,
    tabsWrapperScrollLeft: 0,
  })

  const tabs = useMemo<ITab[]>(() => {
    if (!children || !Array.isArray(children)) {
      return []
    }
    return React.Children.map(children, (item, index) => ({
      title: item?.props?.title,
      subTitle: item?.props?.subTitle,
      name: item?.props?.name ?? index,
    }))
  }, [children])

  const activeTabInfo = useMemo(() => {
    if (!tabs) {
      return defaultTabInfo
    }
    let index = active
    if (typeof active === 'string') {
      index = tabs.findIndex((t) => t.name === active)
    }
    const activeRes = tabsInfos[index]
    if (!activeRes) {
      return defaultTabInfo
    }
    return {
      left: activeRes.left,
      width: activeRes.width,
      tabsWrapperScrollLeft:
        scroll && activeRes.left && activeRes.width && tabsWidth
          ? activeRes.left + activeRes.width / 2 - tabsWidth / 2
          : 0,
    }
  }, [active, defaultTabInfo, scroll, tabs, tabsInfos, tabsWidth])

  useEffect(() => {
    if (autoScroll) {
      Taro.nextTick(async () => {
        if (tabs.length <= 0 || !tabsRef.current) {
          return
        }
        const tabsItemEle = tabsRef.current?.childNodes
        const temp: Taro.NodesRef.BoundingClientRectCallbackResult[] = []
        for (let i = 0; tabsItemEle && i < tabsItemEle.length; i++) {
          if (tabsItemEle[i]?.childNodes[0]?.childNodes[0]) {
            const childNode = tabsItemEle[i].childNodes[0].childNodes[0]
            const childNodeId =
              hasSubTitle && childNode?.childNodes?.[0]?.uid
                ? childNode.childNodes[0]?.uid
                : childNode?.uid
            const res = await selectorQueryClientRect(`#${childNodeId}`)
            temp.push(res)
          }
        }
        const res = await selectorQueryClientRect(`#${tabsRef?.current?.uid}`)
        setTabsInfos(temp)
        setTabsWidth(res?.width)
      })
    }
  }, [tabs, hasSubTitle])

  const handleClickTabs = (name: number | string) => {
    onChange(name)
  }

  const getChildren = () => {
    const fn = (child, index) =>
      React.cloneElement(child, {
        name: child?.props?.name || index,
        active,
        animated,
      })
    return (
      (children &&
        Array.isArray(children) &&
        React.Children.map(children, fn)) ||
      null
    )
  }

  const tabsSize = React.Children.count(children)

  const getTabsIndicator = () =>
    smile ? (
      <View
        className='tabs-indicator-smile'
        style={{
          color: indicatorColor,
        }}
      >
        <HuiIcon name='010-choose' size={18} />
      </View>
    ) : (
      <View
        className='tabs-indicator'
        style={{
          background: indicatorColor,
        }}
      ></View>
    )

  const getTabsItem = (tab: ITab) =>
    hasSubTitle ? (
      <View className='tabs-title-twin'>
        <View
          className='title'
          style={{ color: tab.name === active ? indicatorColor : '' }}
        >
          {tab.title}
        </View>
        <View
          className='sub-title'
          style={{ color: tab.name === active ? indicatorColor : '' }}
        >
          {tab.subTitle}
        </View>
      </View>
    ) : (
      <View
        className={cx('tabs-title', {
          [`tabs-title-smile`]: smile,
        })}
      >
        {tab.title}
      </View>
    )

  const tabsContent = (
    <View
      ref={tabsRef}
      className={cx(
        'hui-tabs-wrapper',
        { scrollable: scroll },
        { normal: !scroll },
        { 'no-shadow': !shadow },
      )}
    >
      {tabs.map((tab) => (
        <View
          key={`${tab.name}`}
          className={`tabs-item length-${tabsSize}`}
          onClick={() => handleClickTabs(tab.name)}
        >
          <View
            className={cx('tabs-item-wrapper', { active: active === tab.name })}
          >
            {getTabsItem(tab)}
            {getTabsIndicator()}
          </View>
        </View>
      ))}
    </View>
  )

  const activeTabIndex = tabs.findIndex((t) => t.name === active)

  const huiTabsBar = (
    <View {...rest} className={cx('hui-tabs-bar', { 'no-shadow': !shadow })}>
      {scroll ? (
        <ScrollView
          enhanced
          showScrollbar={false}
          scrollX={scroll}
          scrollLeft={activeTabInfo.tabsWrapperScrollLeft}
          scrollWithAnimation
          className='scrollable-tabs-wrapper'
        >
          {tabsContent}
        </ScrollView>
      ) : (
        tabsContent
      )}
    </View>
  )
  return (
    <View className={`hui-tabs ${className}`} style={style}>
      {sticky ? (
        <HuiSticky offsetTop={offsetTop}>{huiTabsBar}</HuiSticky>
      ) : (
        huiTabsBar
      )}
      <View className='hui-tabs-panel-wrapper'>
        <View
          className={cx('hui-tabs-panel', {
            'switch-with-animation': animated,
          })}
          style={
            animated
              ? { transform: `translateX(-${100 * activeTabIndex}%)` }
              : {}
          }
        >
          {getChildren()}
        </View>
      </View>
    </View>
  )
}

export default HuiTabs
