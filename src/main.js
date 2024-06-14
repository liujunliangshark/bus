import { createApp } from 'vue';
import './style.scss';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import router from './router';
import './mock';
import App from './App.vue';
const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);
app.mount('#app');
