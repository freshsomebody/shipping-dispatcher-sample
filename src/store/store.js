import Vue from 'vue'
import Vuex from 'vuex'

import trailers from './modules/trailers'
import wares from './modules/wares'
import warehouses from './modules/warehouses'
import missions from './modules/missions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    trailers,
    wares,
    warehouses,
    missions
  },

  state: {
    mission: {}
  },

  actions: {},

  mutations: {}
})
