<template>
<div>
   <l-map
      :center="center"
      :zoom="zoom"
      class="map"
      ref="map"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      >
      <l-tile-layer
         :url="url"
         >
      </l-tile-layer>

<l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
      <l-marker
         :lat-lng="markers"
         >
         <l-icon ref="icon">
     <img class="restaurant-icon" :src="imageUrl"/>
   </l-icon>
         </l-marker>
   </l-map>
   </div>
</template>
<script>
   import {LMap, LTileLayer, LMarker, LIcon, LPolyline } from 'vue2-leaflet';
   import 'leaflet/dist/leaflet.css';
  
   export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
      LPolyline
    },
    data () {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        center: [ 40.713829, -73.989667 ],
        zoom: 15,
        markers:  [ 40.713829, -73.989667 ],
         polyline: {
        latlngs: [[40.713829, -73.989667 ], [46.7766, -71.2706]],
        color: 'red'
      },
   imageUrl:'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png'
      }
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom;
        console.log(this.markers)
      },
      centerUpdated (center) {
        this.center = center;
      }
    }
   }
</script>
<style>
   .map {
    position:absolute;
    
    width:70% !important;
    height:30% !important;
    margin-left:2%;
    margin-right:2%;
    flex:1;
    border-radius:10%;
    padding-bottom:10%;

   align-content: center;
   }
 .restaurant-icon {
   height: 60px;
   width: auto;

 }
</style>
