<template>
<v-container grid-list-lg>
  <v-layout
    text-xs-center
    wrap
  >
    <v-flex sm12 md4>
      <h1>Ware Collection</h1>
      <WareItem
        v-for="ware in wares"
        :key="ware.id"
        :ware="ware"
      />
      <h2>Total weight: {{ totalWeight }}</h2>
    </v-flex>

    <v-flex sm12 md4 v-if="totalWeight > 0">
      <h1>Availabe Trailers</h1>
      <TrailerItem
        v-for="trailer in trailers"
        :key="trailer.id"
        :trailer="trailer"
        v-show="trailer.capacity >= totalWeight"
      />
    </v-flex>

    <v-flex sm12 md4 v-if="totalWeight > 0 && selectedTrailerId">
      <h1>Route</h1>
      <v-select
        :items="mockCities"
        label="From city"
        v-model="fromCity"
      ></v-select>

      <v-select
        :items="mockToCities"
        label="To city"
        v-model="toCity"
      ></v-select>

      <v-btn
        v-if="totalWeight > 0 && selectedTrailerId && fromCity && toCity"
        to="/mission" @click="submitMission"
      >Submit</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TrailerItem from '@/components/TrailerItem'
import WareItem from '@/components/WareItem'

// mock city data
import Cities from '@/mockData/cities'

export default {
  components: {
    TrailerItem,
    WareItem
  },

  data () {
    return {
      mockCities: Cities,
      fromCity: null,
      toCity: null
    }
  },

  computed: {
    ...mapState({
      wares: state => state.wares.wares,
      collection: state => state.wares.collection,
      trailers: state => state.trailers.trailers,
      selectedTrailerId: state => state.trailers.selectedTrailerId
    }),

    totalWeight () {
      if (Object.values(this.collection).length <= 0) return 0

      let total = 0
      Object.values(this.collection).forEach(ware => {
        total += ware.weight * ware.quantity
      })

      if (total === 0) {
        this.setSelectedTrailerId(null)
      }

      return total
    },

    mockToCities () {
      return this.mockCities.filter(city => city !== this.fromCity)
    }
  },

  methods: {
    ...mapMutations({
      setSelectedTrailerId: 'trailers/setSelectedTrailerId',
      setMission: 'setMission'
    }),

    submitMission () {
      const collection = Object.values(this.collection).filter(ware => ware.quantity > 0)
      const trailer = this.selectedTrailerId
      const route = [
        this.fromCity,
        this.toCity
      ]

      this.setMission({
        collection,
        trailer,
        route
      })

      this.$router.push({ name: 'mission' })
    }
  }
}
</script>
