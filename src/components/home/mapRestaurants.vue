<template>
<div>

  <b-button v-if="!showedPopup" v-on:click="showedPopup= !showedPopup" block>Show all restaurants popups on map</b-button>

  <b-button v-if="showedPopup" v-on:click="showedPopup= !showedPopup" block>Hide some restaurants popups on map</b-button>
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
      v-on:mouseenter="showedYourPosition=true"
      >
      <MglPopup
        :showed="showedYourPosition ? showedPopup : !showedPopup"
      >
        It's your position
      </MglPopup>
      
    </MglMarker> 
    <template v-if="computedShow">
      <MglMarker
        v-for="restaurant in restaurantsFiltered"
        :key="restaurant.id"
        :coordinates="restaurant.location.coordinates"
        color="red"
        v-on:mouseenter="showRestaurant(restaurant.id)"
      >
      <MglPopup
        :showed="showActualrestaurant(restaurant.id) ? !showedPopup : showedPopup"
        
      >
        <RestaurantDescription :restaurant="restaurant">
        </RestaurantDescription>
      </MglPopup>
    </MglMarker>
    </template>
    <MglAttributionControl />
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
     
  </MglMap>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup,  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl} from "vue-mapbox";
import RestaurantDescription from "./restaurantDescription.vue"

export default {
  name: "MapView",
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglAttributionControl,

    MglNavigationControl,
    MglGeolocateControl,
    RestaurantDescription
  },
  props: ["restaurantsFiltered"],
  data: () => ({
    latlng: [],
    accessToken:
     "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw",
    mapStyle: "mapbox://styles/mapbox/streets-v11",
    showedYourPosition: false,
    show: undefined,
    showedPopup: false
  }),
  methods: {
    showRestaurant(id) {
       this.show = id
    },
    showActualrestaurant(id){
      return this.show === id
    }

  },
  computed: {
    computedLngLat() {
      const [lat, lng] = this.latlng;
      return [lng, lat];
    },
    computedShow() {
      return this.restaurantsFiltered != undefined;
    }
     
  },

  mounted() {
    if (this.$store.state.geolocationPosition){
       this.latlng = [
      this.$store.state.geolocationPosition.coords.latitude,
      this.$store.state.geolocationPosition.coords.longitude,
    ];
    }
    else {
      this.latlng = [0,0]
    }
   
   
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
