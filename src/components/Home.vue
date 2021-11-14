<template>
  <body>
    <div id="search">
      <div id="search-bar">
        <input
          placeholder="search for restaurants..."
          id="input"
          type="search"
        />
      </div>
      <div id="search-filter">
        <div class="filter-option">
          <div class="filter-title">Price range</div>
          <div id="price">
            <input type="checkbox" name="price" value="$" /> $
            <input type="checkbox" name="price" value="$$" /> $$
            <input type="checkbox" name="price" value="$$$" /> $$$
          </div>
        </div>
        <div class="filter-option">
          <div class="filter-title">Type</div>
          <div id="type">
            <input type="checkbox" name="type" value="Chic" /> Chic
            <input type="checkbox" name="type" value="Casual" /> Casual
            <input type="checkbox" name="type" value="Cafe" /> Cafe
            <input type="checkbox" name="type" value="Pub" /> Pub
          </div>
        </div>
        <div class="filter-option">
          <div class="filter-title">Cuisine</div>
          <div id="cuisine">
            <input type="checkbox" name="type" value="Chic" /> Italian
            <input type="checkbox" name="type" value="Casual" /> Chinese
            <input type="checkbox" name="type" value="Cafe" /> Thai
            <input type="checkbox" name="type" value="Pub" /> Mexican
            <input type="checkbox" name="type" value="Pub" /> American
          </div>
        </div>
      </div>
    </div>
    <!-- here -->
    <div id="apply-filters">
      <button>Apply filters</button>
    </div>

    <div id="restaurant-container">
      <div
        class="item-container"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <h1>{{ restaurant.name }}</h1>
        <img class="item-image" :src="restaurant.pictures[0]" />
        <div>
          <p>restaurant</p>
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
import { createVisit } from "./api/restaurants.js";

export default {
  name: "App",
  components: {
    Datepicker,
    Modal,
  },
  data: function () {
    return {
      isModalVisible: false,
      filterGenres: [],
      filterPriceRange: [],
      comment: "",
      rating: 0,
      date: Date.now(),
      currentRestaurantId: "",
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
    submitVisit: async function () {
      const visitDate = new Date(this.date);
      const body = {
        restaurant_id: this.currentRestaurantId,
        comment: this.comment,
        rating: parseInt(this.rating),
        date: visitDate.toISOString()
      };
      // TODO Quel est l'id du user?
      await createVisit(userId, body);
      this.closeModal();
    },
  },
  computed: {
    restaurants() {
      return this.$store.state.restaurants;
    },
  },
  async mounted() {
    this.$store.dispatch("getRestaurants");
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
