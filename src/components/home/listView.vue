<template>
  <b-card-group columns class="padding">
    <div v-for="restaurant in restaurantsFiltered"
      :key="restaurant.id">
    
      <RestaurantDescription :restaurant="restaurant"> </RestaurantDescription>
   
    </div>
  </b-card-group>
</template>
<script>
import RestaurantDescription from "./restaurantDescription.vue";

export default {
  name: "listView",
  props: ["restaurantsFiltered"],
  components: {
    RestaurantDescription,
  },
  data: function () {
    return {
      limit: undefined,
      page: undefined,
    };
  },
  async mounted() {
    this.$store.dispatch("getRestaurants");
    this.$store.dispatch("getRestaurantsVisited");
  },
};
</script>
<style></style>
