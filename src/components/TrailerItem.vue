<template>
<v-card class="wareItem mb-4" @click="setSelectedTrailerId(trailer.id)">
  <v-card-title :class="[
    { grey: !isSelected },
    { success: isSelected },
    'lighten-2']"
  >
    <v-layout justify-space-between>
      <h3>{{ trailer.name }}</h3>
      <div>Capacity: {{ trailer.capacity }} kg</div>
    </v-layout>
  </v-card-title>
</v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    trailer: Object
  },

  computed: {
    ...mapState('trailers', {
      selectedTrailerId: state => state.selectedTrailerId
    }),

    isSelected () {
      return this.trailer.id === this.selectedTrailerId
    }
  },

  methods: {
    ...mapMutations('trailers', {
      setSelectedTrailerId: 'setSelectedTrailerId'
    })
  }
}
</script>
