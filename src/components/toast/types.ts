import type { Numeric } from '@/utils/types'

export type ToastPosition = 'top' | 'middle' | 'bottom'
export type IconType = 'loading' | 'success' | 'fail'

export type ToastOptions = {
  message?: string
  /** 是否渲染经过 DOMPurify 清洗的 HTML，默认关闭。 */
  allowHtml?: boolean
  duration?: number
  position?: ToastPosition
  icon?: IconType
  iconSize?: Numeric
  onOpened?: () => void
  onClose?: () => void
}
