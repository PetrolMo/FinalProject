import { createApp} from 'vue'
import App from './App.vue'
import Router from './router/index'
import Store from './store/index'
import VueCompositionApi from '@vue/composition-api'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App);
app.use(Router);
app.use(Store);
app.use(ElementPlus,{locale});
app.mount('#app');
