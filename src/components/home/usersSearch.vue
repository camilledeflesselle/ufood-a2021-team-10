<template>

</template>
<script>

export default {
  name: "userSearch",
  data: function () {
    return {
    };
  },
  async mounted() {
    this.$store.dispatch("getRestaurants");
    this.$store.dispatch("getRestaurantsVisited");
  }
};
</script>
<style></style>
