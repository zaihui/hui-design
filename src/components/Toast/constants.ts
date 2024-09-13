export type ToastTypeProp = 'success' | 'fail' | 'warning' | 'text' | 'custom'

export enum ToastTypeEnum {
  SUCCESS = 'success',
  FAIL = 'fail',
  WARNING = 'warning',
  TEXT = 'text',
  CUSTOM = 'custom',
}

/** toast 布局方向 */
export type AlignType = 'row' | 'column'

/** 获取icon的展示尺寸 */
export function getIconSize(layout: AlignType): number {
  return layout === 'row' ? 20 : 36
}
