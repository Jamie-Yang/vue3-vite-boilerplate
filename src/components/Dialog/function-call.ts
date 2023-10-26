import { createVNode, render } from 'vue'
import DialogConstructor from './Dialog.vue'
import mountComponent from '@/utils/mount-component'

interface DialogOptions {
  title?: string
  message: string
  buttons?: string[]
  align?: 'row' | 'column'
}

const defaults: DialogOptions = {
  title: '',
  message: '',
  buttons: ['我知道了'],
  align: 'row',
}

function showDialog(options: DialogOptions | string = '') {
  const container = document.querySelector('body>div[type=dialog]') ?? document.createElement('div')
  container.setAttribute('type', 'dialog')

  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const opts = Object.assign({ show: true }, defaults, options)

  const vm = createVNode(DialogConstructor, { ...opts })

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

export { showDialog }
