<template>
  <div id="restaurantpage" class="page">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="photo in restaurant.pictures"
        :key="photo"
        :img-src="photo"
      >
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide
        :caption="restaurant.name"
        img-blank
        img-alt="Blank image"
      >
      </b-carousel-slide>
      <b-card :title="restaurant.name"> </b-card>
    </b-carousel>

    <div>
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
      <div>
        <b-button class="button" @click="openModal(restaurantId)">
        Entrer visit
      </b-button>
      </div>
    </div>
    <div class="flex-container">
      <b-list-group class="item">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <b-icon
            icon="geo-alt"
            scale="2"
            variant="danger"
          ></b-icon>
          {{ restaurant.address }}
        </b-list-group-item>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >
          <b-icon
            icon="telephone-fill"
            scale="2"
            variant="warning"
          ></b-icon>
          {{ restaurant.tel }}
        </b-list-group-item>
        <b-list-group class="item">
          <b-list-group-item
            class="d-flex justify-content-center align-items-center"
          >
            Openning Hours
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            v-for="(hour, day) in restaurant.opening_hours"
            :key="day"
          >
            <b-icon
              icon="info-circle-fill"
              scale="2"
              variant="info"
            ></b-icon>
            {{ day }} : {{ hour }}
          </b-list-group-item>
          <b-list-group> </b-list-group>
        </b-list-group>
        

          <b-list-group class="item"> 
            <b-list-group-item
            class="d-flex justify-content-center align-items-center"
          >
           Cuisine
          </b-list-group-item>
            <b-list-group-item v-for="genre in restaurant.genres" :key="genre">
            {{ genre }}
          </b-list-group-item>

          </b-list-group>

             <b-list-group class="item"> 
            <b-list-group-item
            class="d-flex justify-content-center align-items-center"
          >
           Price
          </b-list-group-item>
              <b-list-group-item>
            
        <Price :priceTag="restaurant.price_range"></Price>
          </b-list-group-item>

          </b-list-group>

         <b-list-group class="item"> 
            <b-list-group-item
            class="d-flex justify-content-center align-items-center"
          >
           Rate
          </b-list-group-item>
              <b-form-rating v-model="restaurant.rating" variant="warning" readonly show-value></b-form-rating>
   

          </b-list-group>
  
  
      </b-list-group>
    </div>
    <div class="img-container">
      <b-img v-for="photo in restaurant.pictures" :key="photo" :src="photo">
      </b-img>
      </div>
  
    <div class="item">
      <div class="flex-container">
        <Map
          class="localisation"
          :coord="restaurant.location.coordinates"
        ></Map>
      </div>
    </div>
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
    </Modal>  </div>
  
</template>
<script>
import store from "../api/store/requests.js";
import Map from "./map.vue";
import Price from "./price.vue";
import Stars from "./stars.vue";
import Modal from "./Modal.vue";
import Datepicker from "vuejs-datepicker";
import {
  getListFavorites,
  addRestaurantToList,
  viewListFavorites,
} from "../api/api/favorites.js";
import { createVisit, visitesRestaurantOfUser } from "../api/api/restaurants.js";

export default {
  name: "Restaurant",
  props: ["restaurantId"],
  components: {
    Map,
    Modal,
    Price,
    Datepicker,
  },
  data: () => {
    return {
      slide: 0,
      sliding: null,
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
      return this.$store.state.info_restaurant;
    },
    listResto() {
      return this.$store.state.ListFavorites.items;
    },
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
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
    openModal: function (id) {
      this.isModalVisible = true;
      this.currentRestaurantId = id;
    },
    closeModal: function () {
      this.isModalVisible = false;
      this.comment = "";
      this.rating = "3";
      this.date = Date.now();
      this.currentRestaurantId = "";
    },
    submitVisit: async function () {
      const visitDate = new Date(this.date);
      const body = {
        restaurant_id: this.currentRestaurantId,
        comment: this.comment,
        rating: parseInt(this.rating),
        date: visitDate.toISOString(),
      };
      // TODO Quel est l'id du user?
      const userId = "5f766f6dad626a0004ba134f";
      await createVisit(userId, body);
      this.closeModal();
      this.$store.state.restaurantsVisited = visitesRestaurantOfUser(userId);
    },
  },
  mounted() {
    if (this.restaurantId) {
      window.localStorage.setItem("restoId", this.restaurantId);
      this.$store.dispatch("getInfoRestaurant", this.restaurantId);
    } else {
      this.$store.dispatch(
        "getInfoRestaurant",
        window.localStorage.getItem("restoId")
      );
    }
    this.$store.dispatch("getList");
  },
};
</script>
<style>
.carousel {
  width: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
  height: 600px;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: grey;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
  padding: 10px;
  width: 100%;
}

.img-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
  padding: 10px;
  margin:10px;
}

.img-container img {
  max-height:100px;
  padding: 2px;
}
.page .imgback {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  opacity: 0.2;
}
.item {
  padding-top: 10px;
  width: 100%;
  max-width: 500px;
}
.localisation {
  align-items: space-around;
  margin: 10px;
}
</style>
