import { createApp} from 'vue'
import App from './App.vue'
import Router from './router/index'
import Store from './store/index'
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
app.use(Router);
app.use(Store);
app.use(ElementPlus,{locale: zhCn});
app.mount('#app');
