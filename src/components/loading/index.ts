import { createVNode, render } from 'vue'
import type { App } from 'vue'
import LoadingConstructor from './loading.vue'

let container: Element | null = null

function loading(options: string | false = '加载中...') {
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('type', 'loading')
  }

  if (options === false) {
    render(null, container)
    return
  }

  const vm = createVNode(LoadingConstructor, { show: true, message: options })
  render(vm, container)
  document.body.appendChild(container.firstElementChild as Node)
}

loading.install = (app: App): void => {
  app.config.globalProperties.$loading = loading
}

export default loading
