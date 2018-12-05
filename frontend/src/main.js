import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = Vue.prototype.axios = axios
Vue.use(BootstrapVue)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
