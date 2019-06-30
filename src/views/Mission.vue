<template>
<v-container grid-list-lg>
  <v-layout wrap>
    <!-- the map of routing path -->
    <v-flex xs12>
      <HereRoutingMap
        v-if="routePoints.length === 2"
        width="100%"
        height="400px"
        summary
        :srcGeolocation="routePoints[0].geolocation"
        :destGeolocation="routePoints[1].geolocation"
      />
    </v-flex>

    <!-- Ware information -->
    <v-flex xs12>
      <h2>Wares</h2>
      <v-data-table
        :headers="waresHeaders"
        :items="collection"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.weight }}</td>
        </template>
      </v-data-table>
    </v-flex>

    <!-- Trailer information -->
    <v-flex v-if="trailer">
      <h2>Trailer</h2>
      <v-card>
        <v-card-title>
          <h3>{{ trailer.name }}</h3>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import HereRoutingMap from '@/components/HereRoutingMap'

export default {
  components: {
    HereRoutingMap
  },

  data () {
    return {
      missionId: this.$route.params.missionId,
      collection: [], // The collection of wares in this mission
      trailer: null, // The trailer that runs this mission
      routePoints: [], // The departing and arriving locations

      // The headers for the ware table
      waresHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Weight per item (kg)', value: 'weight' }
      ]
    }
  },

  methods: {
    ...mapActions({
      fetchMissionById: 'missions/fetchMissionById',
      fetchTrailerById: 'trailers/fetchTrailerById',
      fetchWarehouseById: 'warehouses/fetchWarehouseById'
    })
  },

  async created () {
    try {
      // Get the mission info
      let { data: [{
        collection, trailer, route: routeIds
      }] } = await this.fetchMissionById(this.missionId)
      this.collection = collection

      // Get the trailer info
      let { data } = await this.fetchTrailerById(trailer)
      this.trailer = data[0]

      // Get the routing info
      for (const warehouseId of routeIds) {
        let { data } = await this.fetchWarehouseById(warehouseId)
        this.routePoints.push(data[0])
      }
    } catch (error) {
      alert(error)
    }
  }
}
</script>
