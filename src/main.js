import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {store} from "./api/store/requests.js";
import 'leaflet/dist/leaflet.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
var VueCookie = require("vue-cookie");
Vue.use(VueCookie);

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store:store
}).$mount("#app");
