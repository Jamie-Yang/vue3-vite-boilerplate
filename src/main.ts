import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './stores/index'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
