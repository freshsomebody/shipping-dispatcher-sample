<template>
<div class="hereRoutingMap">
  <div
    ref="map"
    :style="{ width: width, height: height }"
  ></div>

  <ul v-if="summary && route">
    <li><b>Total distance:</b> {{ totalDistanceInKm }} km</li>
    <li><b>Travel time:</b> {{ travelTimeInMMSS }} (in current traffic)</li>
  </ul>
</div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  data () {
    return {
      map: {},
      platform: {},
      mapBehavior: null,
      route: null,

      // appId and appCode should be set in .env in production.
      appId: '93VY9cBUOn445rgHuvC8',
      appCode: '4613RWSc9o_FM4dj4DV9XA'
    }
  },

  props: {
    width: String, // the width of the map
    height: String, // the height of the map
    srcGeolocation: Array, // [lat, lng]: the departing geolocation
    destGeolocation: Array, // [lat, lng]: the arriving geolocation
    summary: Boolean // determine whether the summary is shown
  },

  computed: {
    // total distance of this route
    totalDistanceInKm () {
      return this.route.summary.distance / 1000
    },

    // travel time with format (X minutes Y seconds) of this route
    travelTimeInMMSS () {
      const travelTime = this.route.summary.travelTime
      return `${Math.floor(travelTime / 60)} minutes ${travelTime % 60} seconds`
    }
  },

  methods: {
    // Use HERE api to calcuate the route
    calculateRouteFromAtoB () {
      const routeRequestParams = {
        mode: 'fastest;truck',
        representation: 'display',
        routeattributes: 'waypoints,summary,shape,legs',
        waypoint0: this.srcGeolocation.toString(),
        waypoint1: this.destGeolocation.toString()
      }

      let router = this.platform.getRoutingService()
      router.calculateRoute(
        routeRequestParams,
        this.routeRequestOnSuccess,
        this.routeRequestOnError
      )
    },

    routeRequestOnSuccess (result) {
      this.route = result.response.route[0]

      this.addRouteShapeToMap(this.route)
    },

    routeRequestOnError (error) {
      alert(`Can't reach the remote server: ${error}`)
    },

    // Draw the route path to the map
    addRouteShapeToMap (route) {
      let lineString = new H.geo.LineString()
      let routeShape = route.shape
      let polyline

      routeShape.forEach(point => {
        const parts = point.split(',')
        lineString.pushLatLngAlt(parts[0], parts[1])
      })
      polyline = new H.map.Polyline(lineString, {
        style: {
          lineWidth: 4,
          strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
      })
      // add the polyline to the map
      this.map.addObject(polyline)
      // Zoon to polyline's bounding rectangle
      this.map.setViewBounds(polyline.getBounds(), true)
    }
  },

  created () {
    // initialize the HERE api
    this.platform = new H.service.Platform({
      'app_id': this.appId,
      'app_code': this.appCode
    })
  },

  mounted () {
    // initialize the map
    this.map = new H.Map(
      this.$refs.map,
      this.platform.createDefaultLayers().normal.map,
      {
        center: { lat: 52.5160, lng: 13.3779 },
        zoom: 13
      }
    )
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => this.map.getViewPort().resize())

    // make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    this.mapBehavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))

    // calculate routing
    this.calculateRouteFromAtoB()
  },

  destroyed () {
    // remove the resize listener when this component is destroyed
    window.removeEventListener('resize', () => this.map.getViewPort().resize())
  }
}
</script>
