import mountComponent from '@/utils/mount-component'

import Dialog from './Dialog.vue'

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

  const { vNode, unmount } = mountComponent(Dialog, {
    show: true,
    ...defaults,
    ...options,
  })

  return new Promise((resolve) => {
    vNode!.props!.onBtnClick = (index: number) => {
      resolve(index)
      unmount()
    }
  })
}

export { showDialog }
