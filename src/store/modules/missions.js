import axios from 'axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  actions: {
    fetchMissionById (store, missionId) {
      return axios.get(`/missions?id=${missionId}`)
    },

    createNewMission (store, mission) {
      return axios.post('/missions', mission)
    }
  },

  mutations: {}
}
