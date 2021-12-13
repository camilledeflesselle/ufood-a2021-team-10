<template>
  <v-card max-height="300">
    <v-list id="followingList">
      <v-list-item
        class="followingItem"
        v-for="following in listFollowing"
        :key="following.id"
      >
      </v-list-item>
      <!-- <v-list-item-avatar> </v-list-item-avatar> -->
      <v-list-item-content>
        <v-list-item-title v-text="following.name"></v-list-item-title>
      </v-list-item-content>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    listFollowing() {
      return this.$store.state.listFollowing;
    },
  },
  async mounted() {
    this.$store.dispatch("getListFollowing");
  },
};
</script>
