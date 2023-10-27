import type { ComponentPublicInstance } from 'vue'
import type { ToastOptions } from './types'
import ToastConstructor from './Toast.vue'
import mountComponent from '@/utils/mount-component'
import { isObject } from '@/utils/validate'

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
  const { vNode, unmount } = mountComponent(ToastConstructor, {
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
