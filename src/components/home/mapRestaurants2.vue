<template>
  <MglMap :accessToken="accessToken" :mapStyle.sync="mapStyle">
    <!-- Adding navigation control -->
    <MglNavigationControl position="top-right" />
    <!-- Adding GeoJSON layer -->
    
  </MglMap>
</template>

<script>
import { MglMap, MglNavigationControl,  } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    
  },
  name:"Map",
  props: ["restaurants", "geolocationPosition"],
  data() {
    return {
      accessToken: "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw",
      mapStyle: "mapbox://sprites/mapbox/streets-v8"
    };
  },
  computed: {
    geoJson () {
    let mygeojson = {"type": "FeatureCollection", "features": []};
   
    Object.values(this.restaurants).forEach(point => {
      let coordinate = point.location.coordinates;
      let properties = point;
      delete properties.location ;    
      let feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": coordinate}, "properties": properties};
      mygeojson.features.push(feature);
    });

  return mygeojson
  },
  geoJsonLayer () {
    let mygeojson = [];
   
    Object.values(this.restaurants).forEach(point => {
      
      let feature = {"sourceId": point.id, "source": "mapbox-streets",
    "source-layer": "water",
    "type": "fill",
    "paint": {
      "fill-color": "#00ffff"
    }
      }
      mygeojson.push(feature);
      console.log(mygeojson);
    });

    
  return mygeojson
  },

}
}
</script>