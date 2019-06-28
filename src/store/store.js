import Vue from 'vue'
import Vuex from 'vuex'

import trailers from './modules/trailers'
import wares from './modules/wares'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    trailers,
    wares
  },

  state: {
    mission: {}
  },

  actions: {},

  mutations: {
    setMission (state, mission) {
      state.mission = mission
    }
  }
})
