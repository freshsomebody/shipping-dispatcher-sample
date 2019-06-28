<template>
<v-card class="wareItem mb-4">
  <v-card-title :class="[
    { grey: !isSelected },
    { success: isSelected },
    'lighten-2']"
  >
    <v-layout justify-space-between>
      <h3>{{ ware.name }}</h3>
      <div>{{ ware.weight }} kg per item</div>
    </v-layout>
  </v-card-title>

  <v-card-actions>
    <v-select
      :items="quantityOptions"
      label="Quantity"
      v-model="selectedQuantity"
    ></v-select>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      selectedQuantity: 0
    }
  },

  props: {
    ware: Object
  },

  computed: {
    quantityOptions () {
      let options = []
      for (let i = 0; i <= this.ware.quantity; i++) {
        options.push(i)
      }

      return options
    },

    isSelected () {
      return this.selectedQuantity > 0
    }
  },

  methods: {
    ...mapMutations('wares', {
      setCollection: 'setCollection'
    })
  },

  watch: {
    selectedQuantity (quantity) {
      let collection = {}
      collection[this.ware.id.toString()] = {
        ...this.ware,
        quantity: quantity
      }
      this.setCollection(collection)
    }
  }
}
</script>
