import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/assets/styles/index.scss'

import App from './App.vue'
import router from './router'
import { setupStore } from './stores/index'

const app = createApp(App)
setupStore(app)
app.use(router)
app.mount('#app')
