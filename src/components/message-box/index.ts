import { createApp, App, h } from 'vue'
import MessageBox from './message-box.vue'

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

function showMessageBox(options: MessageBoxOptions | string = '') {
  let messageBoxDiv = document.querySelector('body>div[type=message-box]')
  if (!messageBoxDiv) {
    messageBoxDiv = document.createElement('div')
    messageBoxDiv.setAttribute('type', 'message-box')
  }

  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const opts = Object.assign(
    {
      show: true,
      onOnclickbtn: (index: number): void => {
        console.log(index)
      },
    },
    defaults,
    options
  )

  createApp({
    render() {
      return h(MessageBox, opts)
    },
  }).mount(messageBoxDiv)

  document.body.appendChild(messageBoxDiv)

  // return new Promise((resolve) => {
  //   instance.$on('onClickBtn', (btnIndex) => {
  //     instance.show = false
  //     resolve(btnIndex)
  //   })
  // })
}

export default {
  install: (app: App): void => {
    app.config.globalProperties.$showMessageBox = showMessageBox
  },
}
