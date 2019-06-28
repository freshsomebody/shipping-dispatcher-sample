// use mock data
import trailers from '../../mockData/trailers'

export default {
  namespaced: true,

  state: {
    trailers: trailers,
    selectedTrailerId: null
  },

  getters: {},

  actions: {},

  mutations: {
    setTrailers (state, newTrailers) {
      state.trailers = newTrailers
    },

    setSelectedTrailerId (state, trailerId) {
      state.selectedTrailerId = trailerId
    }
  }
}
