import Vue from 'vue'
import Router from 'vue-router'
import Dispatcher from './views/Dispatcher.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dispatcher',
      component: Dispatcher
    },
    {
      path: '/mission/:missionId',
      name: 'mission',
      component: () => import('./views/Mission.vue')
    }
  ]
})
