// use mock data
import wares from '../../mockData/wares'

export default {
  namespaced: true,

  state: {
    wares: wares,
    collection: {}
  },

  getters: {},

  actions: {},

  mutations: {
    setWares (state, newWares) {
      state.wares = newWares
    },

    setCollection (state, collection) {
      state.collection = Object.assign({}, state.collection, collection)
    }
  }
}
