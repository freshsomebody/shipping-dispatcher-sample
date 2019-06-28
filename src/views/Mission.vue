<template>
<div>
  {{ this.mission }}
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      mission: state => state.mission
    })
  }
}
</script>
