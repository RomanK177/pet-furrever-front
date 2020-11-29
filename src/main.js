import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import { Button, Select } from 'element-ui';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import i18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/main.scss';

Vue.use(ElementUI, {locale});
Vue.use(i18n);
Vue.config.lang = 'en';
Vue.config.productionTip = false
Vue.component(Select.name, Select);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')