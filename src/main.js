import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Dialog, Uploader,Popup } from 'vant';
import 'vant/lib/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).use(Dialog).use(ElementPlus).mount('#app')
