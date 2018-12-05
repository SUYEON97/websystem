import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import feather from 'vue-icon'
import 'vue-cal/dist/vuecal.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
// import '../node_modules/materialize-css/sass/materialize.scss';
// eslint-disable-next-line
// import '../node_modules/materialize-css/dist/js/materialize.min.js';
Vue.config.productionTip = false;

Vue.use(feather, 'v-icon')

Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
