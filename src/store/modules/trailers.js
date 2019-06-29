import axios from 'axios'

export default {
  namespaced: true,

  state: {
    trailers: [],
    selectedTrailerId: null
  },

  getters: {},

  actions: {
    async fetchTrailers ({ commit }) {
      const { data } = await axios.get('/trailers')
      commit('setTrailers', data)
    }
  },

  mutations: {
    setTrailers (state, newTrailers) {
      state.trailers = newTrailers
    },

    setSelectedTrailerId (state, trailerId) {
      state.selectedTrailerId = trailerId
    }
  }
}
