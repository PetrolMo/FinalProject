import { createApp} from 'vue'
import App from './App.vue'
import Router from './router/index'
import Store from './store/index'
import VueCompositionApi from '@vue/composition-api'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
app.use(Router);
app.use(Store);
app.use(ElementPlus);
app.mount('#app');
