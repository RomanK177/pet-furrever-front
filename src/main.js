import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import { Button, Select } from 'element-ui';

import '@/styles/main.scss';

Vue.config.productionTip = false
Vue.component(Select.name, Select);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')