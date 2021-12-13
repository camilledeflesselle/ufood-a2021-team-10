<template>
  <div>
    <v-list id="followerList">
      <v-list-item
        class="followerItem"
        v-for="follower in listFollowers"
        :key="follower.id"
      >
      </v-list-item>
      <v-list-item-content>
        <v-list-item-title v-text="follower.name"></v-list-item-title>
      </v-list-item-content>
    </v-list>
  </div>
</template>

<script>
export default {
  computed: {
    listFollowers() {
      return this.$store.state.follower;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  async mounted() {
    this.$store.dispatch("getFollower_Following", this.userInfo.token);
  },
};
</script>
