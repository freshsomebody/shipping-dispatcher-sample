<template>
<div>
  {{ this.mission }}
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      missionId: this.$route.params.missionId,
      collections: []
    }
  },

  methods: {
    ...mapActions({
      fetchMissionById: 'missions/fetchMissionById'
    })
  },

  async created () {
    try {
      const mission = this.fetchMissionById(this.missionId)
      this.collections = mission.data.collections

      const trailerId = mission.data.trailer
      const route = mission.data.route
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
