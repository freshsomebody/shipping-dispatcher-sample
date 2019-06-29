import axios from 'axios'

export default {
  namespaced: true,

  state: {
    wares: [],
    collection: {}
  },

  getters: {},

  actions: {
    async fetchWares ({ commit }) {
      const { data } = await axios.get('/wares')
      commit('setWares', data)
    }
  },

  mutations: {
    setWares (state, newWares) {
      state.wares = newWares
    },

    setCollection (state, collection) {
      state.collection = Object.assign({}, state.collection, collection)
    },

    clearCollection (state) {
      state.collection = {}
    }
  }
}
