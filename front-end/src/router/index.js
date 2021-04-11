import Vue from 'vue'
import VueRouter from 'vue-router'
import Legacy from '../views/Legacy.vue'
import LegacyMap from '../views/LegacyMap.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'legacy',
    component: Legacy
  },
  {
    path: '/map',
    name: 'legacyMap',
    component: LegacyMap
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
