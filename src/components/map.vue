<template>
  <div id="map" class="map"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";

export default {
  props: ["coord"],
  name: "BaseMap",

  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.coord,
      zoom: 12,
    });

    // Set marker options.
    const marker = new mapboxgl.Marker({
      color: "#3887be",
    })
      .setLngLat(this.coord)
      .addTo(map);

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    //  map.on("load", function () {
    //    directions.setOrigin(this.coord); // can be address in form setOrigin("12, Elm Street, NY")
    //    // this.directions.setDestinaion(this.coord); // can be address
    //  });

    map.addControl(directions, "top-right");
  },
};
</script>
<style>
.map {
  position: absolute;
  width: 80%;
  height: 100%;
  border-radius: 20px;
  left: 10%;
  right: 10%;
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
