//require('./bootstrap');

window.Vue = require('vue').default;
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://127.0.0.1:8000/api"
Vue.config.productionTip = false


//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    VueAxios,
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')