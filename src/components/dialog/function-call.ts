import { mountPopup } from '@/utils/mount-popup'

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
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const currentOptions = { ...defaults, ...options }

  return new Promise((resolve) => {
    const { unmount } = mountPopup(Dialog, {
      show: true,
      ...currentOptions,
      onBtnClick: (index: number) => {
        resolve(index)
        unmount()
      },
    })
  })
}

export { showDialog }
