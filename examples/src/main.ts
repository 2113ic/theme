import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

import '@icxy/theme/index.css'

createApp(App)
  .use(router)
  .mount('#app')
