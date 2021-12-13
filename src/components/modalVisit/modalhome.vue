<template>
  <div>
    <b-dropdown text="Ajouter Favoris" block
      size="sm">
        <b-dropdown-item
          v-for="list in listResto"
          :key="list.id"
          @click="addRestaurantToList(list.id, restaurant.id)"
        >
          {{ list.name }}
        </b-dropdown-item>
      </b-dropdown>
    <b-button
      @click="openModal(restaurant.id)"
      variant="warning"
      block
      size="sm"
      >Add to visited</b-button
    >

    <b-modal
      :ref="'modal-' + restaurant.id"
      :id="'modal-' + restaurant.id"
      :title="title"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      hide-footer
    >
      <div>Date of your visit:</div>
      <b-form-datepicker
        id="example-datepicker"
        v-model="date"
        class="mb-2"
      ></b-form-datepicker>
      <div>Write a comment:</div>
      <b-form-textarea
        v-model="comment"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <div>
        <label for="rating">Your rate:</label>
        <b-form-rating v-model="rating"></b-form-rating>
      </div>
      <b-button @click="submitVisit" variant="warning" class="mt-3"
        >Submit your visit</b-button
      >
    </b-modal>
  </div>
</template>
<script>
import {
  createVisit,
  visitesRestaurantOfUser,
} from "../../api/api/restaurants.js";

export default {
  name: "ModalHomeVisit",
  props: ["restaurant"],
  data: function () {
    return {
      comment: "",
      rating: 0,
      date: undefined,
      currentRestaurantId: "",
      title: "",
    };
  },
  methods: {
    openModal: function (id) {
      this.$refs["modal-" + id].show();
      this.currentRestaurantId = id;
      this.title = "Submit visit of " + this.restaurant.name;
    },

    submitVisit: async function () {
      const visitDate = new Date(this.date);
      const body = {
        restaurant_id: this.currentRestaurantId,
        comment: this.comment,
        rating: parseInt(this.rating),
        date: visitDate.toISOString(),
      };
      const userId = this.$store.state.userInfo.id;

      await createVisit(userId, body);

      this.$store.state.restaurantsVisited = visitesRestaurantOfUser(userId);
      this.$refs["modal-" + this.currentRestaurantId].hide();
      this.comment = "";
      this.rating = 0;
      this.date = undefined;
      this.currentRestaurantId = "";
      this.$bvModal.msgBoxOk("Action completed").catch((err) => {
        // An error occurred
      });
    },
  },
};
</script>
