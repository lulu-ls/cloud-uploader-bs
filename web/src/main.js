import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import {createPinia} from 'pinia';

import 'element-plus/dist/index.css';
import 'animate.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import {http} from './common/axios';
import App from './App.vue';


const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$http = http;

// store
app.use(pinia);

// 注册所有组件
app.use(ElementPlus);
// 注册所有图标
for (let key in ElementPlusIconsVue) {
    app.component(key, ElementPlusIconsVue[key]);
}

app.mount('#app');
