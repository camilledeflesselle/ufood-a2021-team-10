<template>
  <div id="map2" class="map"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";

export default {
  props: ["restaurants"],
  name: "Map",

  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw";
    const map = new mapboxgl.Map({
      container: "map2",
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.restaurants[0].location.coordinates, //changer avec position de l'utilisateur
      zoom: 12,
    });
    
    // Set marker options.
    Object.values(this.restaurants).forEach(restaurant => {
    
    const marker = new mapboxgl.Marker({
      color: "#3887be",
    })
      .setLngLat(restaurant.location.coordinates)
      .addTo(map);
    
    })

    let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    //  map.on("load", function () {
    //    directions.setOrigin(this.coord); // can be address in form setOrigin("12, Elm Street, NY")
    //    // this.directions.setDestinaion(this.coord); // can be address
    //  });

    map.addControl(directions, "top-right");
    map.scrollZoom.disable();
  },
};
</script>
<style>
.map {
  position: absolute;
  width: 100%;
  height: 60%;
}
.restaurant-icon {
  height: 60px;
  width: auto;
}
.marker {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;

  background: #3887be;
  pointer-events: none;
}
</style>
