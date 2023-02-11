import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import Cookies from 'js-cookie'
import componentsInstall from './plugins/install'

Vue.config.productionTip = false

Vue.prototype.$globalApiURL = 'http://127.0.0.1:3000'

new Vue({
  router,
  vuetify,
  axios,
  Cookies,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')

Vue.use(componentsInstall)