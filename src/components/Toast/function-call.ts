import type { App, ComponentPublicInstance } from 'vue'
import type { ToastOptions } from './types'
import ToastConstructor from './Toast.vue'
import mountComponent from '@/utils/mount-component'
import { isObject } from '@/utils/validate'

let seed = 1
let instance: ComponentPublicInstance | null | undefined

const defaultOptions: ToastOptions = {
  message: '',
  duration: 3000,
  position: 'top',
  icon: '',
  iconSize: undefined,
}

function parseOptions(message: string | ToastOptions): ToastOptions {
  return isObject(message) ? message : { message }
}

function Toast(options: string | ToastOptions = {}): void {
  const parsedOptions = parseOptions(options)
  const id = `toast_${seed++}`
  const { vnode, unmount } = mountComponent(ToastConstructor, {
    id,
    ...defaultOptions,
    ...parsedOptions,
    onDestroy: () => {
      unmount()
    },
  })
  instance = vnode.component?.proxy
}

Toast.hide = (): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore `visible` from defineExpose
  instance.visible = false
}

Toast.install = (app: App): void => {
  app.config.globalProperties.$toast = Toast
}

export default Toast
