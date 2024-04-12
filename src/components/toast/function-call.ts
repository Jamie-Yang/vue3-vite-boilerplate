import type { ToastOptions } from './types'
import type { ComponentPublicInstance } from 'vue'

import { mountPopup } from '@/utils/mount-popup'

import Toast from './Toast.vue'

type ToastInstance = ComponentPublicInstance<{ visible: boolean }>

let seed = 1
let instance: ToastInstance | null

const defaults: ToastOptions = {
  message: '',
  duration: 3000,
  position: 'middle',
  icon: '',
  iconSize: undefined,
}

function showToast(options: string | ToastOptions = ''): void {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const id = `toast_${seed++}`
  const { instance: toastInstance, unmount } = mountPopup<ToastInstance>(Toast, {
    id,
    ...defaults,
    ...options,
    onDestroy: () => {
      instance = null
      unmount()
    },
  })

  instance = toastInstance
}

function closeToast() {
  if (!instance) return
  instance.visible = false
}

export { showToast, closeToast }
