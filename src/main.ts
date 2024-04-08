import { createPinia } from 'pinia'
import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
