import { createApp, App, inject, ComponentPublicInstance } from 'vue'
import Toast from './toast.vue'

type ToastType = typeof Toast

const ToastSymbol = Symbol()

const getInstance = (): ComponentPublicInstance => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  return createApp(Toast).mount(el)
}

function showToast(message = '') {
  const instance = getInstance()
  instance.message = message
  instance.show = true
}

export function useToast(): typeof showToast {
  const fn = inject<typeof showToast>(ToastSymbol)
  if (!fn) {
    throw new Error('error')
  }
  return fn
}

export default {
  install: (app: App): void => {
    app.config.globalProperties.$showToast = showToast
    app.provide(ToastSymbol, showToast)
  },
}
