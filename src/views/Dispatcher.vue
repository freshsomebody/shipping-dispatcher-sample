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
      <h3 v-if="availableTrailers.length === 0">No available trailers</h3>
      <TrailerItem
        v-for="trailer in availableTrailers"
        :key="trailer.id"
        :trailer="trailer"
      />
    </v-flex>

    <v-flex sm12 md4 v-if="totalWeight > 0 && selectedTrailerId">
      <h1>Route</h1>
      <v-select
        :items="warehouses"
        item-text="name"
        item-value="id"
        label="From"
        v-model="srcWarehouse"
      ></v-select>

      <v-select
        :items="availableDestWarehouses"
        item-text="name"
        item-value="id"
        label="To"
        v-model="destWarehouse"
      ></v-select>

      <v-btn
        v-if="totalWeight > 0 && selectedTrailerId && srcWarehouse && destWarehouse"
        @click="submitMission"
      >Submit</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import TrailerItem from '@/components/TrailerItem'
import WareItem from '@/components/WareItem'

export default {
  components: {
    TrailerItem,
    WareItem
  },

  data () {
    return {
      srcWarehouse: null,
      destWarehouse: null
    }
  },

  computed: {
    ...mapState({
      wares: state => state.wares.wares,
      collection: state => state.wares.collection,
      trailers: state => state.trailers.trailers,
      selectedTrailerId: state => state.trailers.selectedTrailerId,
      warehouses: state => state.warehouses.warehouses
    }),

    totalWeight () {
      if (Object.values(this.collection).length <= 0) return 0

      let total = 0
      Object.values(this.collection).forEach(ware => {
        total += ware.weight * ware.quantity
      })

      return total
    },

    availableTrailers () {
      return this.trailers.filter(ware => ware.capacity >= this.totalWeight)
    },

    availableDestWarehouses () {
      if (this.totalWeight === 0) return []

      return this.warehouses.filter(warehouse => warehouse.id !== this.srcWarehouse)
    }
  },

  methods: {
    ...mapActions({
      fetchWares: 'wares/fetchWares',
      fetchTrailers: 'trailers/fetchTrailers',
      fetchWarehouses: 'warehouses/fetchWarehouses',
      createNewMission: 'missions/createNewMission'
    }),

    ...mapMutations({
      setSelectedTrailerId: 'trailers/setSelectedTrailerId',
      setMission: 'setMission',
      clearCollection: 'wares/clearCollection'
    }),

    async submitMission () {
      const collection = Object.values(this.collection).filter(ware => ware.quantity > 0)
      const trailer = this.selectedTrailerId
      const route = [
        this.srcWarehouse,
        this.destWarehouse
      ]

      const newMission = {
        collection,
        trailer,
        route
      }

      try {
        const { data } = await this.createNewMission(newMission)

        this.$router.push({ name: 'mission', params: { missionId: data.id } })
      } catch (error) {
        console.log(error)
      }
    }
  },

  async created () {
    try {
      await this.fetchWares()
      await this.fetchTrailers()
      await this.fetchWarehouses()
    } catch (error) {
      console.log(error)
    }
  },

  destroyed () {
    this.clearCollection()
  }
}
</script>
