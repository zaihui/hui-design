import { ReactNode } from 'react'

export interface StepItem {
  description?: ReactNode
  title?: ReactNode
  disabled?: boolean
  /**
   * 是否完全展示title，默认false
   */
  showSlicedTitle?: boolean
}

export interface HuiSteppersProps {
  current?: number
  disabled?: boolean
  className?: string
  items?: StepItem[]
  /**
   * 是否完全展示title，默认false
   */
  showSlicedTitle?: boolean
  onChange?: (current: number, e: any) => void
}

export const prefix = 'hui-steps'
export const stepActive = `${prefix}-steps-step-active`
export const stepLive = `${prefix}-steps-step-live`
export const stepNormal = `${prefix}-steps-step-normal`
export const stepFixWidth = 136
