import { createApp } from 'vue'

import '@/assets/styles/reset.css'
import '@/core/rem.js'

import App from './App.vue'
import router from './router'
import store from './store'

// import loading from '@/components/ui/loading'
// import toast from '@/components/ui/toast'

const app = createApp(App)
app.use(router).use(store).mount('#app')
