import type { ToastOptions } from './types'
import type { ComponentPublicInstance } from 'vue'

import mountComponent from '@/utils/mount-component'
import { isObject } from '@/utils/validate'

import Toast from './Toast.vue'

let seed = 1
let instance: ComponentPublicInstance | null | undefined

const defaultOptions: ToastOptions = {
  message: '',
  duration: 3000,
  position: 'middle',
  icon: '',
  iconSize: undefined,
}

function parseOptions(message: string | ToastOptions): ToastOptions {
  return isObject(message) ? message : { message }
}

function showToast(options: string | ToastOptions = {}): void {
  const parsedOptions = parseOptions(options)
  const id = `toast_${seed++}`
  const { vNode, unmount } = mountComponent(Toast, {
    id,
    ...defaultOptions,
    ...parsedOptions,
    onDestroy: () => {
      unmount()
    },
  })
  instance = vNode.component?.proxy
}

function closeToast() {
  // @ts-ignore `visible` from defineExpose
  instance.visible = false
}

export { showToast, closeToast }
