import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')
