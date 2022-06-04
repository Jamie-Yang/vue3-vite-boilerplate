import { createVNode, render } from 'vue'
import type { App } from 'vue'
import ToastConstructor from './toast.vue'

let seed = 1

function showToast(message = ''): void {
  const id = `toast_${seed++}`
  const container = document.createElement('div')
  container.className = `container_${id}`

  const vm = createVNode(ToastConstructor, { id, message })

  if (vm.props) {
    vm.props.onDestroy = () => {
      render(null, container)
    }
  }

  render(vm, container)
  document.body.appendChild(container.firstElementChild as Node)
}

showToast.install = (app: App): void => {
  app.config.globalProperties.$toast = showToast
}

export default showToast
