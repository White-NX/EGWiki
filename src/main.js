import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import Cookies from 'js-cookie'
import componentsInstall from './plugins/install'
import store from './plugins/store'

import throwError from './plugins/throwError' 

const dataBus = new Vue()

Vue.config.productionTip = false

Vue.prototype.$dataBus = dataBus

Vue.prototype.$globalApiURL = 'http://192.168.1.100:3000'
Vue.prototype.$globalApiRootURL = '.eyling.top'

Vue.prototype.$globalDefaultPage = '/#/Homepage'

new Vue({
  router,
  vuetify,
  axios,
  Cookies,
  store,
  throwError,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')

Vue.use(componentsInstall)