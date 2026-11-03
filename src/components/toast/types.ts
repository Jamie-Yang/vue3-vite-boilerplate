import type { Numeric } from '@/utils/types'

export type ToastPosition = 'top' | 'middle' | 'bottom'
export type IconType = 'loading' | 'success' | 'fail'

/** 单个 Toast 的控制句柄，重复关闭或销毁后关闭均无副作用。 */
export interface ToastHandle {
  close: () => void
}

export type ToastOptions = {
  message?: string
  /** 是否渲染经过 DOMPurify 清洗的 HTML，默认关闭。 */
  allowHtml?: boolean
  duration?: number
  position?: ToastPosition
  icon?: IconType
  iconSize?: Numeric
  /** 入场动画完成后触发；入场期间关闭则不触发。 */
  onOpened?: () => void
  /** 自动或手动开始关闭时触发，每个实例仅触发一次。 */
  onClose?: () => void
}
