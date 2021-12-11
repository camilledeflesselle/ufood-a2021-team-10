<template>
  <div id="map" class="map"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";
export default {
  props: ["restaurant"],
  name: "Map",
  computed: {
    geoJson () {
    let mygeojson = {"type": "FeatureCollection", "features": []};
   
      let coordinate = this.restaurant.location.coordinates;  
      let feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": coordinate}, 'properties': {
'description':
`<strong>${this.restaurant.name}</strong> <img width='100px' src='${Object.values(this.restaurant.pictures)[0]}'></img> `,
'icon': 'restaurant-15',
"marker-symbol": "entrance",
                    "marker-size": "big",
                    "marker-color": "#D90008"
}};
      mygeojson.features.push(feature);
  return mygeojson
  },
  },
    mounted() {
      const coord = {lat: this.$store.state.geolocationPosition.coords.latitude,
      lng: this.$store.state.geolocationPosition.coords.longitude
      }
      mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw";
    
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: coord, 
      zoom: 12,
    });
    
   
    const marker2 = new mapboxgl.Marker({
      color: "#3887be",
    })
      .setLngLat(this.restaurant.location.coordinates)
      .addTo(map);

   let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    map.on('load', () => {

map.addSource('places', {'type':'geojson', 'data':this.geoJson})
// Add a layer showing the places.
map.addLayer({
'id': 'places',
'type': 'symbol',
'source': 'places',
'layout': {
'icon-image': '{icon}',
'icon-allow-overlap': true
}
});
 
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});
 
map.on('mouseenter', 'places', (e) => {
map.getCanvas().style.cursor = 'pointer';
 
const coordinates = e.features[0].geometry.coordinates.slice();
const description = e.features[0].properties.description;
 
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
 
popup.setLngLat(coordinates).setHTML(description).addTo(map);
});
 
map.on('mouseleave', 'places', () => {
map.getCanvas().style.cursor = '';
popup.remove();
});

 const coordPosition = [coord.lng, coord.lat]
 const coordRestaurant = [this.restaurant.location.coordinates[0], this.restaurant.location.coordinates[1]]
 directions.setOrigin(coordPosition); 
 directions.setDestination(coordRestaurant); 
});

    const marker = new mapboxgl.Marker({
      color: "#0ABC3e"
    })
      .setLngLat(coord)
      .addTo(map);
  

    map.addControl(directions, "top-right");
    map.scrollZoom.disable();
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');
  },
};
</script>
<style>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
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
