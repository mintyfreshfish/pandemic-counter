import Vue from 'vue'
import App from './App.vue'
import router from './router'
import cities from './pandemicArray.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2TouchEvents from 'vue2-touch-events'
import BootstrapVueIcons from 'bootstrap-vue'

Vue.use(BootstrapVueIcons)

Vue.use(Vue2TouchEvents)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

let data = {
  cities: cities,
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
