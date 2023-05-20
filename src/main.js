import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import Cookies from 'js-cookie'
import componentsInstall from './plugins/install'
import store from './plugins/store'

Vue.config.productionTip = false

Vue.prototype.$globalApiURL = 'http://192.168.1.100:3000'
Vue.prototype.$globalApiRootURL = '.eyling.top'

new Vue({
  router,
  vuetify,
  axios,
  Cookies,
  store,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')

Vue.use(componentsInstall)