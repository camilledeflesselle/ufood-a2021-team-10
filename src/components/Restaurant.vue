<template>
  <body>
    <footer>
      <button class="button">Ajouter favoris</button>
      <button class="button">Entrer visiste</button>
    </footer>
    <div id="restaurantpage">
      <div class="ligne">
        <option>Restaurant</option>
        <div>{{ restaurant.name }}</div>
      </div>
      <div class="ligne">
        <option>Cuisine</option>
        <div>
          <ul>
            <li v-for="genre in restaurant.genres" :key="genre">
              {{ genre }}
            </li>
          </ul>
        </div>
      </div>
      <div class="ligne">
        <option>Price</option>
        <div>
          <Price :priceTag="restaurant.price_range"></Price>
        </div>
      </div>
      <div class="ligne">
        <option>Rate</option>
        <div>
          <Stars :rating="restaurant.rating"></Stars>
        </div>
      </div>
      <div class="ligne">
        <option>Opening hours</option>
        <div>
          <ul>
            <div
              class="small"
              v-for="(hour, day) in restaurant.opening_hours"
              :key="day"
            >
              {{ day }} : {{ hour }}
            </div>
          </ul>
        </div>
      </div>
      <div class="ligne">
        <option>Adresse</option>
        <div>{{ restaurant.address }}</div>
      </div>
      <div class="ligne">
        <option>Telephone</option>
        <div>{{ restaurant.tel }}</div>
      </div>
    </div>
    <div class="listimgres">
      <img
        class="imgres"
        v-for="photo in restaurant.pictures"
        :key="photo"
        :src="photo"
      />
      <img />
    </div>
    <div class="localisation">
      <Map :coord="restaurant.location.coordinates"></Map>
    </div>
  </body>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Map from "./map.vue";
import Stars from "./stars.vue";
import Price from "./price.vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    info: undefined,
  },
  mutations: {
    setInfo(state, data) {
      state.info = { ...data };
    },
  },
  actions: {
    async getInfo({ commit }) {
      const response = await axios.get(
        "https://ufoodapi.herokuapp.com/unsecure/restaurants",
        {
          params: {
            limit: 4,
          },
        }
      );
      commit("setInfo", response.data.items[1]);
    },
  },
});

export default {
  name: "Restaurant",
  props: ["restaurantId"],
  components: {
    Map,
    Stars,
    Price,
  },
  computed: {
    restaurant() {
      return store.state.info;
    },
  },
  mounted() {
    store.dispatch("getInfo");

    let pageres = document.getElementById("restaurantpage");
    let cv = document.createElement("canvas");
    cv.setAttribute("id", "canvas");
    cv.height = "50";
    cv.width = "400";
    pageres.appendChild(cv);
  },
};
</script>
<style>
/*page restaurant*/
html,
body {
  height: 100%;
  font-family: "Montserrat";
}
footer {
  display: flex;
  align-items: right;
  justify-content: right;
}
button {
  background-color: rgb(20, 56, 56);
  color: white;
  font-family: "Montserrat";
  border-radius: 4px;
  margin-right: 10px;
}
#restaurantpage {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  list-style-type: none;
  align-content: center;
  margin: 2%;
  width: 80%;
}
.small {
  height: 1px;
}
.ligne div {
  display: flex;
  padding: 20px;
}
.ligne {
  display: flex;
  padding: 20px;
  text-decoration: none;
  width: 100%;
}
.ligne div {
  flex: 2;
  background-color: #f1f1f1;
  align-items: center;
  border-bottom-right-radius: 10px;
}
.ligne option {
  flex: 1;
  background-color: #f1f1f1;
  align-items: center;
  border-top-left-radius: 10px;
}
#restaurantpage div option {
  color: white;
  padding: 10px;
  background-color: rgb(20, 56, 56);
  font-size: 20px;
}
.imgres {
  flex: 1;
  width: 20%;
  height: 20%;
  padding: 2px;
  align-content: center;
}
.listimgres {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  align-content: center;
}
canvas {
  width: 100%;
}
</style>
