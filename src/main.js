import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

import Auth from './layouts/Auth.vue'
import System from './layouts/System.vue'

Vue.use(VeeValidate);

Vue.component('auth-layout', Auth);
Vue.component('system-layout', System);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
