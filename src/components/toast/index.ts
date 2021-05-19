import { createApp, App, ComponentPublicInstance } from 'vue'
import Toast from './toast.vue'

type ToastType = typeof Toast

const toastPool: ToastType[] = []

const createInstance = (): ComponentPublicInstance => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  return createApp(Toast).mount(el)
}

const getInstance = () => {
  if (toastPool.length > 0) {
    return toastPool.shift()
  }
  return createInstance()
}

const returnInstance = (instance: ToastType) => {
  if (instance) {
    toastPool.push(instance)
  }
}

const removeDom = (event: TransitionEvent) => {
  if (event.target instanceof Element) {
    event.target?.parentNode?.removeChild(event.target)
  }
}

function showToast(message = '') {
  const instance = getInstance()
  instance.message = message
  instance.show = true

  document.body.appendChild(instance.$el.parentNode)

  instance.timer = setTimeout(function () {
    instance.$el.addEventListener('transitionend', removeDom)
    instance.show = false
    returnInstance(instance)
  }, 2000)
}

export default {
  install: (app: App): void => {
    app.config.globalProperties.$showToast = showToast
  },
}
