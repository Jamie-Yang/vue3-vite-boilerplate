import type { Numeric } from '@/utils/types'

export type ToastPosition = 'top' | 'middle' | 'bottom'
export type IconType = 'loading' | 'success' | 'fail'

export type ToastOptions = {
  message?: string
  duration?: number
  position?: ToastPosition
  icon?: string | IconType
  iconSize?: Numeric
  onOpened?: () => void
  onClose?: () => void
}
