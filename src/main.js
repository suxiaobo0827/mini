import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'weui/dist/style/weui.css'
import 'vant/lib/index.css'
import './styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
