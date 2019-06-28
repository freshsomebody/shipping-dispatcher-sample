<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" tag="button">
          <span>Dispatcher</span>
          <span class="font-weight-light">App</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      //
    }
  }
}
</script>
