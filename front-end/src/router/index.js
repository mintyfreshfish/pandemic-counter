import Vue from 'vue'
import VueRouter from 'vue-router'
import Legacy from '../views/Legacy.vue'
import Pandemic from '../views/Pandemic.vue'
import LegacyMap from '../views/LegacyMap.vue'
import Form from '../views/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'legacy',
    component: Legacy
  },
  {
    path: '/pandemic',
    name: 'pandemic',
    component: Pandemic
  },
  {
    path: '/map',
    name: 'legacyMap',
    component: LegacyMap
  },
  {
    path: '/game',
    name: 'form',
    component: Form,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
