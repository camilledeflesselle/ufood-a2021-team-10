<template>

    <b-card-group columns class="padding">
      <b-card
        img-top
        :header="restaurant.name"
        class="mb-2"
        v-for="restaurant in restaurantsFiltered"
        :key="restaurant.id"
      >
        <b-card-body>
          <b-card-img
            :src="restaurant.pictures[0]"
            img-alt="Image"
            overlay
          ></b-card-img>
          <b-card-text>
            <p></p>
            <div>
              <b-button
                v-b-popover.hover="'I am popover content!'"
                class="btn-success"
                size="sm"
              >
                <router-link
                  tag="div"
                  :to="{
                    name: 'Restaurant',
                    params: { restaurantId: restaurant.id },
                  }"
                >
                  More...
                </router-link>
              </b-button>
            </div>

            <div>
              <b-button
                v-b-popover.hover="'I am popover content!'"
                size="sm"
                @click="openModal(restaurant.id)"
                >Add to visited</b-button
              >
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
                <div class="modal-b-button-area">
                  <span>
                    <b-button
                      v-b-popover.hover="'I am popover content!'"
                      size="sm"
                      class="success-variant"
                      @click="submitVisit"
                      >Soumettre</b-button
                    >
                  </span>
                  <span>
                    <b-button
                      v-b-popover.hover="'I am popover content!'"
                      size="sm"
                      @click="closeModal"
                      >Annuler</b-button
                    >
                  </span>
                </div>
              </template>
            </Modal>
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-card-group>
 
</template>
<script>
import Datepicker from "vuejs-datepicker";
import Modal from "../Modal.vue";
import {
  createVisit,
  visitesRestaurantOfUser,
} from "../../api/api/restaurants.js";

export default {
  name: "listView",
  props: ["restaurantsFiltered"],
  components: {
    Datepicker,
    Modal,
  },
  data: function () {
    return {
      isModalVisible: false,
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
  async mounted() {
    this.$store.dispatch("getRestaurants");
    this.$store.dispatch("getRestaurantsVisited");
  }
};
</script>
<style></style>
