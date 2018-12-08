import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import feather from 'vue-icon'
import Vuecal from 'vue-cal'
import VueSession from 'vue-session'
import 'vue-cal/dist/vuecal.css'
Vue.use(feather, 'v-icon')
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
//Vue.use(Vuecal, 'Vuecal')
Vue.use(VueSession)
Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
