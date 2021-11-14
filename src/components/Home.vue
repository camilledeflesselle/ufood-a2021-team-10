<template>
  <body>
    <div id="search">
      <div id="search-bar">
        <input
          placeholder="search for restaurants..."
          v-model="searchTerm"
          type="text"
        />

      </div>
      <div id="search-filter">
        <div class="filter-option">
          <div class="filter-title">Price range</div>
          <div v-for="price_range in PriceRanges" id="price" v-bind:key="price_range">
            <input type="checkbox" v-model="checkedPriceRange" v-bind:value="price_range"/> {{representPrice(price_range)}}
          </div>
        </div>
        <div class="filter-option">
          <div class="filter-title">Genre</div>
          <div id="type">
            <div v-for="genre in genres" id="genres" v-bind:key="genre">
            <input type="checkbox" v-model="checkedGenres" v-bind:value="genre"/> {{genre}}
          </div>
          </div>
        </div>
         
      </div>
    </div>
    <!-- here -->
    
    <div id="restaurant-container">
      <div
        class="item-container"
        v-for="restaurant in restaurantsFiltered"
        :key="restaurant.id"
      >
        <h1>{{ restaurant.name }}</h1>
        <img class="item-image" :src="restaurant.pictures[0]" />
        <div>
          <router-link
            tag="div"
            :to="{
              name: 'Restaurant',
              params: { restaurantId: restaurant.id },
            }"
          >
            <span>
              <button>More...</button>
            </span>
          </router-link>
          <span>
            <button @click="openModal(restaurant.id)">Add to visited</button>
          </span>
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
        </Modal>
      </div>
    </div>
  </body>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import Modal from "./Modal.vue";
import { restaurantsFiltered, createVisit, visitesOfOneRestaurantByUser, visitesRestaurantOfUser } from "./api/restaurants.js";

export default {
  name: "App",
  components: {
    Datepicker,
    Modal,
  },
  data: function () {
    return {
      isModalVisible: false,
      checkedGenres: [],
      checkedPriceRange: [],
      searchTerm:"",
      comment: "",
      rating: 0,
      date: Date.now(),
      currentRestaurantId: "",
      limit: undefined,
      page: undefined,
    };
  },
  methods: {
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
    representPrice: function(range){
      return "$".repeat(range)
    },
    submitVisit: async function () {
      const visitDate = new Date(this.date);
      const body = {
        restaurant_id: this.currentRestaurantId,
        comment: this.comment,
        rating: parseInt(this.rating),
        date: visitDate.toISOString()
      };
      // TODO Quel est l'id du user?
      const userId = "5f766f6dad626a0004ba134f";
      console.log(body)
      await createVisit(userId, body);
      this.closeModal();
      this.$store.state.restaurantsVisited = visitesRestaurantOfUser(userId);
    },
  },
  computed: {
    restaurants() {
      return this.$store.state.restaurants;
    },
    restaurantsFiltered() {
      let res = this.$store.state.restaurants
      if (this.searchTerm !== ""){
        res = Object.values(res).filter(restaurant => {
        return restaurant.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      })}

      if (this.checkedPriceRange.length){
        res = Object.values(res).filter(restaurant => this.checkedPriceRange.includes(restaurant.price_range))
      }
      if (this.checkedGenres.length){
        res = Object.values(res).filter(restaurant => this.checkedGenres.includes(restaurant.genres))

      }
      return res
    },
    PriceRanges(){
      const array = Object.values(this.$store.state.restaurants)
      const unique = [...new Set(array.map(array => array.price_range))];
      return unique
    },
     genres(){
      let array = Object.values(this.$store.state.restaurants)
      let arrays = [...new Set(array.map(array => array.genres))];
      array = [...new Set(arrays.flat(1))].sort()
      return array
    },
    
  },
  async mounted() {
    this.$store.dispatch("getRestaurants");
    this.$store.dispatch("getRestaurantsVisited");
  },
};
</script>

<style>
#search {
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 3rem;
}
#search-bar {
  padding: 1rem;
  display: flex;
}
#search-filter {
  display: flex;
}
#apply-filters {
  padding: 1rem;
}
.filter-option {
  padding-left: 1rem;
  padding-right: 1rem;
}
.filter-title {
  font-size: 1.2rem;
  font-weight: bold;
}
@media screen and (max-width: 600px) {
  #nav .nav-item {
    display: none;
    visibility: hidden;
  }
  #menu-container {
    flex-direction: column;
  }
  #search-filter {
    flex-direction: column;
  }
  #restaurant-container {
    flex-direction: column;
    align-items: center;
  }
  .item-container {
    width: inherit;
  }
}

#restaurant-container {
  display: flex;
  flex-wrap: wrap;
}

.item-container {
  width: 30%;
  padding: 1rem;
}

.item-image {
  width: 100%;
}
</style>
