<template>
  <MglMap
    id="map2"
    :accessToken="accessToken"
    :center="(latlng && latlng.length > 0 && computedLngLat) || [0, 0]"
    :mapStyle.sync="mapStyle"
    :zoom="8"
  >
    <MglMarker
      v-if="latlng && latlng.length > 0"
      :coordinates="computedLngLat"
      color="blue"
    />
    <template v-if="computedShow">
      <MglMarker
        v-for="restaurant in restaurantsFiltered"
        :key="restaurant.id"
        :coordinates="restaurant.location.coordinates"
        color="red"
      >
      <MglPopup
        :showed="showedPopup"
      >
        <RestaurantDescription :restaurant="restaurant">
        </RestaurantDescription>
      </MglPopup>
    </MglMarker>
    </template>
    <MglAttributionControl />
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglScaleControl />
  </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup,  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl } from "vue-mapbox";
import RestaurantDescription from "./restaurantDescription.vue"
export default {
  name: "MapView",
  components: {
    MglMap,
    MglMarker,
    MglPopup,

    MglNavigationControl,
    MglGeolocateControl,
    RestaurantDescription
  },
  props: ["restaurantsFiltered", "restaurants"],
  data: () => ({
    latlng: [],
    accessToken:
     "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw",
    mapStyle: "mapbox://styles/mapbox/streets-v11",
  }),
  computed: {
    computedLngLat() {
      const [lat, lng] = this.latlng;
      return [lng, lat];
    },
    computedShow() {
      return this.restaurantsFiltered != undefined;
    },
     showedPopup() {
       let res = false;
       if(this.restaurantsFiltered != undefined){
         res = Object.values(this.restaurantsFiltered).length < 3;
       }
      return res;
    },
  },

  mounted() {
    this.latlng = [
      this.$store.state.geolocationPosition.coords.latitude,
      this.$store.state.geolocationPosition.coords.longitude,
    ];
    this.mapbox = Mapbox;
  },
};
</script>
<style>
#map2 {
  position: absolute;
  width: 100%;
  height: 80%;
}
</style>
