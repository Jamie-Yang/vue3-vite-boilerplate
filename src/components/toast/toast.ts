import { App, createVNode, render } from 'vue'
import ToastConstructor from './index.vue'

let seed = 1

function Toast(message = ''): void {
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

Toast.install = (app: App): void => {
  app.config.globalProperties.$showToast = Toast
}

export default Toast
