/**
 * 图片状态
 */
export enum ImageStatus {
  /** 暂无图片 */
  Empty,
  /** 加载中 */
  Loading,
  /** 加载失败 */
  Fail,
  /** 加载成功 */
  Success,
}

/**
 * 图片规格
 */
export enum ImageSize {
  /** 加载状态仅展示色块 */
  SMALL = 'small',
  /** 加载状态仅展示文字 */
  MEDIUM = 'medium',
  /** 加载状态展示图文 */
  LARGE = 'large'
}
