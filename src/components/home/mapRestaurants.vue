<template>
  <div id="map2" class="map"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";
export default {
  props: ["restaurants", "geolocationPosition"],
  name: "Map",
  computed: {
    geoJson () {
    let mygeojson = {"type": "FeatureCollection", "features": []};
   
    Object.values(this.restaurants).forEach(point => {
      let coordinate = point.location.coordinates;  
      let feature = {"type": "Feature", "geometry": {"type": "Point", "coordinates": coordinate}, 'properties': {
'description':
`<strong>${point.name}</strong> <img width='100px' src='${Object.values(point.pictures)[0]}'></img> `,
'icon': 'restaurant-15',
"marker-symbol": "entrance",
                    "marker-size": "big",
                    "marker-color": "#D90008"
}};
      mygeojson.features.push(feature);
    });

  return mygeojson
  },
  },
    mounted() {
      const coord = {lat: this.geolocationPosition.coords.latitude,
      lng: this.geolocationPosition.coords.longitude
      }
      mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVmbGVzc2MiLCJhIjoiY2t0enFiY2RoM2EyajJwcGl6enp5MG95biJ9.HJiHufyLG-7K-8DwOCL-cw";
    
    const map = new mapboxgl.Map({
      container: "map2",
      style: "mapbox://styles/mapbox/streets-v11",
      center: coord, 
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
 
// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});
 
map.on('mouseenter', 'places', (e) => {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
 
// Copy coordinates array.
const coordinates = e.features[0].geometry.coordinates.slice();
const description = e.features[0].properties.description;
 
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
 
// Populate the popup and set its coordinates
// based on the feature found.
popup.setLngLat(coordinates).setHTML(description).addTo(map);
});
 
map.on('mouseleave', 'places', () => {
map.getCanvas().style.cursor = '';
popup.remove();
});
 
/* Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', () => {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', () => {
map.getCanvas().style.cursor = '';
});*/
});

    const marker = new mapboxgl.Marker({
      color: "#0ABC3e",
    })
      .setLngLat(coord)
      .addTo(map);
   

    let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

     // map.on("load", function () {
        //directions.setOrigin(coord); // can be address in form setOrigin("12, Elm Street, NY")
       // directions.setDestinaion(this.restaurants[0].address); // can be address
     // });

     

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
