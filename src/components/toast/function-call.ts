import type { ToastOptions, ToastHandle } from './types'
import type { ComponentPublicInstance } from 'vue'

import { mountPopup } from '@/utils/mount-popup'

import Toast from './Toast.vue'

/* 每个 Toast 暴露独立的关闭方法，关闭时同步清理定时器。 */
type ToastInstance = ComponentPublicInstance<{ close: () => void }>

let seed = 1
const instances = new Set<ToastInstance>()

const defaults: ToastOptions = {
  message: '',
  duration: 3000,
  position: 'middle',
  icon: undefined,
  iconSize: undefined,
}

/* 创建独立实例并返回关闭句柄，不影响其他 Toast。 */
function showToast(options: string | ToastOptions = ''): ToastHandle {
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
      if (instances.delete(toastInstance)) unmount()
    },
  })

  instances.add(toastInstance)

  return {
    close: () => {
      if (instances.has(toastInstance)) toastInstance.close()
    },
  }
}

/* 关闭全部仍存活的 Toast，单个关闭使用 showToast 返回的句柄。 */
function closeToast() {
  instances.forEach((instance) => instance.close())
}

export { showToast, closeToast }
