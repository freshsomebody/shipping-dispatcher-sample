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
    },

    fetchTrailerById (store, trailerId) {
      return axios.get(`/trailers?id=${trailerId}`)
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
