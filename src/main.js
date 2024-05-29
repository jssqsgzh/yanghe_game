import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Dialog, Uploader,Popup } from 'vant';
import 'vant/lib/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(store).use(router).use(Dialog).use(ElementPlus).mount('#app')
