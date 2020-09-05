import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'
import '@/core/rem.js'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router).use(store).mount('#app')
