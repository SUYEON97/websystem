import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import feather from 'vue-icon'
import Vuecal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
//import '../node_modules/materialize-css/sass/materialize.scss';
//import '../node_modules/materialize-css/dist/js/materialize.min.js';
Vue.use(feather, 'v-icon')
//Vue.use(Vuecal, 'Vuecal')

Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
