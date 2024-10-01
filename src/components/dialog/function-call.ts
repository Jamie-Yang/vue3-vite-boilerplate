import type { DialogOptions } from './type'

import { mountPopup } from '@/utils/mount-popup'

import Dialog from './Dialog.vue'

function showDialog(options: DialogOptions | string = '') {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const defaultOptions = {
    title: '',
    message: '',
    buttons: ['我知道了'],
    align: 'row',
  }

  return new Promise((resolve) => {
    const { unmount } = mountPopup(Dialog, {
      show: true,
      ...defaultOptions,
      ...options,
      onBtnClick: (index: number) => {
        resolve(index)
        unmount()
      },
    })
  })
}

export { showDialog }
