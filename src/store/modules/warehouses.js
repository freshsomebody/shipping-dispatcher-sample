import axios from 'axios'

export default {
  namespaced: true,

  state: {
    warehouses: []
  },

  getters: {},

  actions: {
    async fetchWarehouses ({ commit }) {
      const { data } = await axios.get('/warehouses')
      commit('setWarehouses', data)
    }
  },

  mutations: {
    setWarehouses (state, newWarehouses) {
      state.warehouses = newWarehouses
    }
  }
}
