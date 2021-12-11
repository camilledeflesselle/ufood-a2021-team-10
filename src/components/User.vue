<template>
  <div id="user" class="padding">
    <h1>User Profile</h1>
    <div class="flex-container bg">
      <div class="item">name place holder</div>
      <div class="item">3.8</div>
    </div>
    <div>
      <h2>Your favorites restaurants</h2>

      <div
        v-for="list in ListFavorites.items"
        :key="list.id"
        class="list-group"
      >
        <b-input-group size="lg" class="mt-4">
          <b-form-input
            v-model="list.name"
            placeholder="Change name..."
            
          ></b-form-input>
          <b-input-group-append>
            <b-button
              size="lg"
              @click="updateListFavorites(list)"
              variant="outline-success"
              >Change name</b-button
            >
            <b-button
              size="lg"
              @click="deleteListFavorites(list.id)"
              variant="danger"
              >X</b-button
            >
          </b-input-group-append>
        </b-input-group>
        <b-collapse
          :id="'test-' + list.id"
          :title="
            list.name +
            ', list of ' +
            list.restaurants.length +
            ' restaurant(s)'
          "
          bg-variant="dark"
          text-variant="light"
          shadow
        >
          <div>
            <b-card
              v-for="restaurant in list.restaurants"
              :key="restaurant.id"
              no-body
              class="overflow-hidden"
              style="max-width: 100%"
            >
              <b-row no-gutters>
                <b-col md="3">
                  <b-card-img
                    :src="restaurantInfo(restaurant.id).pictures[0]"
                    alt="Image"
                    width="20%"
                  ></b-card-img>
                </b-col>
                <b-col md="9">
                  <b-card-body :title="restaurantInfo(restaurant.id).name">
                    <b-card-text>
                      <router-link
                        :to="{
                          name: 'Restaurant',
                          params: { restaurantId: restaurant.id },
                        }"
                      >
                        More...
                      </router-link>
                    </b-card-text>
                    <b-button
                      right="true"
                      size="sm"
                      @click="deleteRestaurantFromList(restaurant.id, list.id)"
                      variant="danger"
                      >Delete X</b-button
                    >
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-collapse>
        <b-button block v-b-toggle="'test-' + list.id"
          >View Restaurants (total : {{ list.restaurants.length }})</b-button
        >
      </div>
      <div class="item">
        Create a new list :
        <b-input-group size="lg" prepend="New list">
          <b-form-input
            v-model="inputValue"
            placeholder="Choose a name..."
            variant="success"
          ></b-form-input>
          <b-button
            size="lg"
            :disabled="inputValue === ''"
            @click="createListFavorites"
            variant="success"
            >Create</b-button
          >
        </b-input-group>
      </div>
    </div>
    <h2>Recent restaurants Visited</h2>
    <b-card-group columns class="padding">
      <b-card v-for="resto in restaurantsVisited" :key="resto.id">
        <img
          class="card-img-top"
          :src="restaurantInfo(resto.restaurant_id).pictures[0]"
          alt="Card image cap"
        />
        <div class="card-body-right">
          <router-link
            :to="{
              name: 'Restaurant',
              params: { restaurantId: resto.restaurant_id },
            }"
          >
            <h5 class="card-title">
              {{ restaurantInfo(resto.restaurant_id).name }}
            </h5>
          </router-link>

          <p class="card-text"></p>
          <p>{{ viewNumberVisitsRestaurant(resto.restaurant_id) }} visite</p>

          <b-dropdown
            text="Add to a list of favorites"
            variant="primary"
            class="m-2"
            size="sm"
          >
            <b-dropdown-item
              v-for="list in ListFavorites.items"
              :key="list.id"
              @click="addRestaurantToList(list.id, resto.restaurant_id)"
              tooltip="add to list"
            >
              {{ list.name }}
            </b-dropdown-item>
          </b-dropdown>

          <b-btn
            class="m-2"
            size="sm"
            @click="openModal(resto.restaurant_id, resto)"
            >View visit information
          </b-btn>
        </div>
      </b-card>
    </b-card-group>
    <router-link to="/">Home</router-link>
    <Modal v-if="isModalVisible">
      <template v-slot:m-header> Visite </template>
      <template v-slot:m-body>
        <div>Date de la visite : {{ date }}</div>
        <div>Commentaire: {{ comment }}</div>
        <div>
          <label for="rating">Votre cote : {{ rating }}</label>
        </div>
      </template>
      <template v-slot:m-footer>
        <div class="modal-button-area">
          <span><button @click="closeModal">Close</button></span>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import {
  createListFavorites,
  //createUser,
  getListFavorites,
  updateListFavorites,
  deleteListFavorites,
  deleteRestaurantFromList,
  addRestaurantToList,
  viewListFavorites,
} from "../api/api/favorites.js";
import {
  restaurantInfo,
  visitesRestaurantOfUser,
  visitesOfOneRestaurantByUser,
} from "../api/api/restaurants.js";
import Modal from "./Modal.vue";

export default {
  name: "App",
  components: {
    Modal,
  },
  data: () => ({
    inputValue: "",
    restaurantsName: {},
    isModalVisible: false,
    comment: "",
    rating: 0,
    date: "",
    currentVisiteId: "",
  }),
  computed: {
    ListFavorites() {
      return this.$store.state.ListFavorites;
    },
    restaurants() {
      return this.$store.state.restaurants;
    },
    restaurantsVisited() {
      return this.$store.state.restaurantsVisited;
    },
    restoName() {
      return this.restaurantsName;
    }
  },
  methods: {
    async createListFavorites() {
      await createListFavorites(this.inputValue);
      this.inputValue = "";
      this.$store.state.ListFavorites = await getListFavorites();
    },
    async updateListFavorites(list) {
      await updateListFavorites(list);
      this.$store.state.ListFavorites = await getListFavorites();
    },
    async deleteListFavorites(id) {
      await deleteListFavorites(id);
      this.$store.state.ListFavorites = await getListFavorites();
    },
    async addRestaurantToList(listId, restaurantId) {
      if (restaurantId) {
        // be sure that list doens't have duplicated keys
        let res = await restaurantInfo(restaurantId);
        this.restaurantsName[restaurantId] = res.name;
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
    async deleteRestaurantFromList(restaurantId, ListId) {
      if (restaurantId) {
        await deleteRestaurantFromList(restaurantId, ListId);
        this.$store.state.ListFavorites = await getListFavorites();
      }
    },
    async viewListFavorites(id) {
      return await viewListFavorites(id);
    },
    restaurantInfo(idRestaurant) {
      const data = this.$store.state.restaurants;
      if (data && idRestaurant) {
        let res = Object.values(data).find(
          (restaurant) => restaurant.id === idRestaurant
        );
        return res;
      }
    },
    async visitesOfOneRestaurantByUser(restaurantId) {
      if (restaurantId) {
        await visitesOfOneRestaurantByUser(restaurantId);
      }
    },
    viewNumberVisitsRestaurant(restaurantId) {
      let nb = 0;
      const visits = this.$store.state.restaurantsVisited;
      if (visits) {
        for (let visit in visits) {
          if (visits[visit].restaurant_id == restaurantId) {
            ++nb;
          }
        }
      }
      return nb;
    },
    openModal: function (id, viste) {
      this.isModalVisible = true;
      this.currentRestaurantId = id;
      this.currentVisiteId = viste.id;
      this.comment = viste.comment;
      this.rating = viste.rating;
      this.date = viste.date.substring(0, 10);
    },
    closeModal: function () {
      this.isModalVisible = false;
      this.comment = "";
      this.rating = "3";
      this.date = "";
      this.currentRestaurantId = "";
      this.currentVisiteId = "";
    },
  },
  async mounted() {
    this.$store.dispatch("getList");
    this.$store.dispatch("getRestaurantsVisited");
    this.$store.dispatch("getRestaurants");
  },
};
</script>
<style>
.padding {
  padding: 10px;
  margin: 10px;
}
</style>
