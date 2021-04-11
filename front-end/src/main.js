import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2TouchEvents from 'vue2-touch-events'
import BootstrapVueIcons from 'bootstrap-vue'
import Loadscript from 'vue-plugin-load-script';

Vue.use(BootstrapVueIcons)
Vue.use(Vue2TouchEvents)
Vue.use(BootstrapVue)
Vue.use(Loadscript)

Vue.config.productionTip = false

let data = {
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
