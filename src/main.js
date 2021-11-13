import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {store} from "./components/store/ListFavorites.js";
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store:store
}).$mount("#app");
