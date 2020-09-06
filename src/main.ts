import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'
import '@/core/rem.js'

import App from './App.vue'
import router from './router'
import store from './store'
import use from '@/core/use'

const app = createApp(App)
use(app)
app.use(router).use(store).mount('#app')
