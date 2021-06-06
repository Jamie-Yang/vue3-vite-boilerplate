import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'
import '@/core/rem.js'

import App from './App.vue'
import router from './router'
import store from './store'

import Toast from '@/components/toast/toast'
import MessageBox from '@/components/message-box'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toast)
app.use(MessageBox)
app.mount('#app')
