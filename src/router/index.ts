/* eslint-disable max-classes-per-file */
/**
 * 对原生的连路径都要手动拼接的路由方法的封装
 * 利用了ts的类型系统，可以实现跳转页面时的参数提示
 * 具体通过在路由中添加页面时添加对应的类型声明
 *
 * 例如：
 *
 *
 * 在目标页获取路由参数时可以使用(this.$router.params as unknown as PageParamsSomePage)完成参数类型转换
 */

import Taro from '@tarojs/taro'

import { getPageUrl } from './page'

/**
 * 包装原生的路由方法
 */
function reLaunch<P>(
  packageName: string, name: string, params?: P,
): void {
  Taro.reLaunch({
    url: getPageUrl(packageName, name, params),
  })
}

function redirectTo<P>(
  packageName: string, name: string, params?: P,
): void {
  Taro.redirectTo({
    url: getPageUrl(packageName, name, params),
  })
}

function navigateTo<P>(
  packageName: string, name: string, params?: P,
): void {
  Taro.navigateTo({
    url: getPageUrl(packageName, name, params),
  })
}

class PageItem {
  /**
   * 页面名字
   */
  name: string

  /**
   * 子包名
   */
  packageName: string

  /**
   * 是否是tab
   */
  isTab: boolean

  constructor(name: string, packageName = '', isTab = false) {
    this.name = name
    this.packageName = packageName
    this.isTab = isTab
  }

  get url() {
    return getPageUrl(this.packageName, this.name)
  }
}

/**
 * 创建带参数的页面
 */
class PageItemNormal<P> extends PageItem {
  constructor(name: string, packageName = '') {
    super(name, packageName, false)
  }

  reLaunch(params?: P): void {
    reLaunch(this.packageName, this.name, params)
  }

  redirectTo(params?: P): void {
    redirectTo(this.packageName, this.name, params)
  }

  navigateTo(params?: P): void {
    navigateTo(this.packageName, this.name, params)
  }
}

export interface SomePageParams {
  uid: string
}

export interface SubPackagePageParams {
  uid: string
}

export const COMMON_PACKAGE_NAME = 'packages/extra'

export default {
  navigateBack: Taro.navigateBack,
  Index: new PageItemNormal('Index'),
  ComponentList: new PageItemNormal('ComponentList'),
  NavPage: new PageItemNormal('NavPage'),
  Login: new PageItemNormal('Login'),
  Demo: new PageItemNormal('Demo'),
  Icon: new PageItemNormal('Icon'),
  ToastPage: new PageItemNormal('ToastPage'),
  Dialog: new PageItemNormal('Dialog'),
  Input: new PageItemNormal('Input'),
  Form: new PageItemNormal('Form'),
  Button: new PageItemNormal('Button'),
  TextArea: new PageItemNormal('TextArea'),
  Divider: new PageItemNormal('Divider'),
  Loader: new PageItemNormal('Loader'),
  Switch: new PageItemNormal('Switch'),
  ActionSheet: new PageItemNormal('ActionSheet'),
  Picker: new PageItemNormal('Picker'),
  DefaultPage: new PageItemNormal('DefaultPage'),
  Checkbox: new PageItemNormal('Checkbox'),
  Radio: new PageItemNormal('Radio'),
  Tabs: new PageItemNormal('Tabs'),
  Sticky: new PageItemNormal('Sticky'),
  Tag: new PageItemNormal('Tag'),
  List: new PageItemNormal('List'),
  ContentList: new PageItemNormal('ContentList'),
  Grid: new PageItemNormal('Grid'),
  Stepper: new PageItemNormal('Stepper'),
  Tooltip: new PageItemNormal('Tooltip'),
  SwiperIndicator: new PageItemNormal('SwiperIndicator'),
  Badge: new PageItemNormal('Badge'),
  NoticeBar: new PageItemNormal('NoticeBar'),
  Image: new PageItemNormal('Image'),
  Avatar: new PageItemNormal('Avatar'),
  Popup: new PageItemNormal('Popup'),
  Modal: new PageItemNormal('Modal'),
  Search: new PageItemNormal('Search'),
  Select: new PageItemNormal('Select'),
  // SomePage: new PageItemNormal<SomePageParams>('SomePage'), // 常规有参数页面
  // TabPage: new PageItemTab('TabPage'),
  // Home: new PageItemTab('Home'),
  // SubPackagePage: new PageItemNormal<SubPackagePageParams>
  //  ('SubPackagePage', COMMON_PACKAGE_NAME),

  Color: new PageItemNormal('Color'),
  Text: new PageItemNormal('Text'),
  Layer: new PageItemNormal('Layer'),
  DefaultPageDetail: new PageItemNormal('DefaultPageDetail'),
  LoaderDetail: new PageItemNormal('LoaderDetail'),
  Team: new PageItemNormal('Team'),
  Share: new PageItemNormal('Share'),
  Timer: new PageItemNormal('Timer'),
  Footer: new PageItemNormal('Footer'),
  Skeleton: new PageItemNormal('Skeleton'),
  NavBar: new PageItemNormal('NavBar'),
  NavBarBlackDetail: new PageItemNormal('NavBarBlackDetail'),
  NavBarWhiteDetail: new PageItemNormal('NavBarWhiteDetail'),
  EditorDisplay: new PageItemNormal('EditorDisplay'),
  EditorDisplayDetail: new PageItemNormal('EditorDisplayDetail'),
  Mask: new PageItemNormal('Mask'),
  FloatingActionButton: new PageItemNormal('FloatingActionButton'),
  Title: new PageItemNormal('Title'),
  HightLightText: new PageItemNormal('HighlightText'),
  Card: new PageItemNormal('Card'),
  Steppers: new PageItemNormal('Steppers'),
  Filter: new PageItemNormal('Filter'),
}
