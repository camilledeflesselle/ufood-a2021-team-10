<template>
<b-card
      img-top
      :header="restaurant.name"
    >
    <b-card-img
      :src="restaurant.pictures[0]"
      img-alt="Image"
      overlay
    ></b-card-img>
    <div class="mt-3">
      <b-button block class="btn-info" size="sm">
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

      <div v-if="this.$store.state.isConnected">
        <ModalHomeVisit :restaurant="restaurant"></ModalHomeVisit>
      </div>
    </div>
  </b-card>
</template>
<script>
import ModalHomeVisit from "../modalVisit/modalhome.vue";

export default {
  name: "RestaurantDescription",
  props: ["restaurant"],
  components: {
    ModalHomeVisit,
  },
};
</script>
<style></style>
