import React from 'react'

interface FilterContext {
  /** 页面滚动的top  */
  scrollTop: number
  /** 是否固定 */
  isFixed: boolean
  /** 隐藏下拉菜单 */
  hideMenu: () => void
  /** 隐藏右侧filter组件的popup */
  hideFilter: () => void
  /** filter弹出层需要便宜的距离  */
  offsetLeft: number
}

const FilterContext = React.createContext<FilterContext | Record<string, any>>(
  {},
)

export default FilterContext
