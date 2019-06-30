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
    },

    fetchWarehouseById (store, warehouseId) {
      return axios.get(`/warehouses?id=${warehouseId}`)
    }
  },

  mutations: {
    setWarehouses (state, newWarehouses) {
      state.warehouses = newWarehouses
    }
  }
}
