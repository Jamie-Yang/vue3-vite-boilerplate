import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'
// import '@/core/rem.js'

import App from './App.vue'
import router from './router'

import Toast from '@/components/Toast'
import MessageBox from '@/components/MessageBox'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Toast)
app.use(MessageBox)
app.mount('#app')
