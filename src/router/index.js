import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { LMap, LTileLayer, LMarker, LControl } from 'vue2-leaflet';

import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(Router);



export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/restaurant",
      name: "Restaurant",
      component: Restaurant,
    },
    {
      path: "/user",
      name: "User",
      component: User,
    },
  ],
});

