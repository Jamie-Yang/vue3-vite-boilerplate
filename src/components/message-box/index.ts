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
  let div = document.querySelector('body>div[type=message-box]')
  if (!div) {
    div = document.createElement('div')
    div.setAttribute('type', 'message-box')
  }

  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const opts = Object.assign(
    {
      show: true,
      onBtnClick: (index: number): void => {
        console.log(index)
      },
    },
    defaults,
    options
  )

  const app = createApp({
    render() {
      return h(MessageBox, opts)
    },
  }).mount(div)

  document.body.appendChild(div)

  return new Promise((resolve) => {
    
  })
}

export default {
  install: (app: App): void => {
    app.config.globalProperties.$showMessageBox = showMessageBox
  },
}
