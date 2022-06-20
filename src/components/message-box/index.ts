import { createVNode, render } from 'vue'
import type { App } from 'vue'
import MessageBoxConstructor from './message-box.vue'

interface MessageBoxOptions {
  title?: string
  message: string
  buttons?: string[]
  align?: 'row' | 'column'
}

const defaults: MessageBoxOptions = {
  title: '',
  message: '',
  buttons: ['我知道了'],
  align: 'row',
}

function messageBox(options: MessageBoxOptions | string = '') {
  const container = document.querySelector('body>div[type=message-box]') ?? document.createElement('div')
  container.setAttribute('type', 'message-box')

  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const opts = Object.assign({ show: true }, defaults, options)

  const vm = createVNode(MessageBoxConstructor, { ...opts })

  render(vm, container)
  document.body.appendChild(container.firstElementChild as Node)

  return new Promise((resolve) => {
    if (!vm.props) return

    vm.props.onBtnClick = (index: number) => {
      resolve(index)
      render(null, container)
    }
  })
}

messageBox.install = (app: App): void => {
  app.config.globalProperties.$messageBox = messageBox
}

export default messageBox
