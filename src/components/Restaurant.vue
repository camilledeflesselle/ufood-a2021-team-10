<template>
  <body>
    <Modal v-if="isModalVisible">
      <template v-slot:m-header> Ajout d'une visite </template>
      <template v-slot:m-body>
        <div>Date de la visite</div>
        <Datepicker v-model="date"></Datepicker>
        <div>Commentaire:</div>
        <textarea
          name="commentArea"
          id="comment"
          placeholder="Entrez votre commentaire ici"
          v-model="comment"
        ></textarea>
        <div>
          <label for="rating">Votre cote :</label>
          <select name="rating" id="rating" v-model="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </template>
      <template v-slot:m-footer>
        <div class="modal-button-area">
          <span><button @click="submitVisit">Soumettre</button></span>
          <span><button @click="closeModal">Annuler</button></span>
        </div>
      </template>
    </Modal>
    <footer>
      <b-dropdown
        text="Ajouter Favoris"
        variant="primary"
        class="m-2"
        size="lg"
      >
        <b-dropdown-item
          v-for="list in listResto"
          :key="list.id"
          @click="addRestaurantToList(list.id, restaurant.id)"
        >
          {{ list.name }}
        </b-dropdown-item>
      </b-dropdown>
      <button class="button" @click="viewModal(restaurantsVisited[0])">
        Entrer visit
      </button>
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
import Modal from "./Modal.vue";
import Datepicker from "vuejs-datepicker";
import { createVisit } from "./api/restaurants.js";

import {
  addRestaurantToList,
  viewListFavorites,
  getListFavorites,
} from "./api/favorites";
Vue.use(Vuex);

const storeRes = new Vuex.Store({
  state: {
    info: undefined,
  },
  mutations: {
    setInfo(state, data) {
      state.info = { ...data };
    },
  },
  actions: {
    async getInfo({ commit }, id) {
      const response = await axios.get(
        `https://ufoodapi.herokuapp.com/unsecure/restaurants/${id}`,
        {}
      );
      commit("setInfo", response.data);
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
    Modal,
    Datepicker,
  },
  data: function () {
    return {
      isModalVisible: false,
      filterGenres: [],
      filterPriceRange: [],
      comment: "",
      rating: 0,
      date: Date.now(),
    };
  },
  computed: {
    restaurant() {
      return storeRes.state.info;
    },
    listResto() {
      return this.$store.state.ListFavorites.items;
    },
  },
  methods: {
    async addRestaurantToList(listId, restaurantId) {
      if (restaurantId) {
        // be sure that list doens't have duplicated keys
        let oldList = await viewListFavorites(listId);
        oldList = oldList.restaurants;
        let obj = Object.values(oldList);
        for (let i = 0; i < oldList.length; i++) {
          obj[i] = oldList[i].id;
        }
        if (obj.indexOf(restaurantId) == -1) {
          await addRestaurantToList(listId, restaurantId);
        }
        this.$store.state.ListFavorites = await getListFavorites();
      }
    },
    openModal: function () {
      this.isModalVisible = true;
    },
    closeModal: function () {
      this.isModalVisible = false;
    },
  },
  mounted() {
    storeRes.dispatch("getInfo", this.restaurantId);
    this.$store.dispatch("getList");
  },
};
</script>
<style>
/*page restaurant*/

footer {
  display: flex;
  align-items: right;
  justify-content: right;
}
.button {
  background-color: rgb(20, 56, 56);
  color: white;
  font-family: "Montserrat";
  border-radius: 4px;
  font-size: 15px;
  margin-right: 15px;
}
#restaurantpage {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  list-style-type: none;
  align-content: center;
  margin: 10%;
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
