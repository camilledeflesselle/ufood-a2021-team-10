<template>
  <div>
    <div v-if="!this.$store.state.isConnected">
      Connectez vous pour avoir cette fonctionnalité...
    </div>
    <div v-if="this.$store.state.isConnected" id="usage" class="padding">
      <ul>
        <li
          v-for="item in listUsage"
          v-bind:key="item.id"
          style="line-height: 40px"
        >
          <a v-if="item.name.trim().length > 0">{{ item.name }}</a>
          <a v-if="item.name.trim().length === 0">--no name--</a>
          <b-button
            v-b-toggle="'collapse' + item.id"
            size="sm"
            variant="outline-primary"
            style="float: right"
            >Profile</b-button
          >
          <b-collapse :id="'collapse' + item.id" class="mt-2">
            <b-card>
              <div>Name : {{ item.name }}</div>
              <div>Email : {{ item.email }}</div>
              <div>Rating : {{ item.rating }}</div>
              <b-button
                size="sm"
                @click="follow(item.id)"
                variant="outline-primary"
                style="float: right"
                :disabled="isFollowed(item.id)"
                >Follow</b-button
              >
              <b-button
                size="sm"
                @click="unfollow(item.id)"
                variant="outline-primary"
                style="float: right"
                :disabled="!isFollowed(item.id)"
                >Unfollow</b-button
              >
            </b-card>
          </b-collapse>
        </li>
      </ul>
      <b-button
        size="sm"
        @click="prevPage()"
        variant="outline-primary"
        :disabled="this.page === 0"
        >prev page</b-button
      >
      <b-button
        size="sm"
        @click="nextPage()"
        variant="outline-primary"
        :disabled="this.page >= maxPage"
        >next page</b-button
      >
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default {
  name: "Usage",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  data: () => ({
    page: 0,
  }),
  computed: {
    listUsage() {
      return this.$store.state.listUsages;
    },
    maxPage() {
      return Math.floor(this.$store.state.totalUsage / 100);
    },
    isConnected() {
      return this.$store.state.isConnected;
    },
  },
  watch: {
    isConnected(newval, oldVal) {
      if (newval) {
        this.$store.dispatch("getUsager", {'page': this.page, "token": this.$cookie.get("token_access")});
        this.$store.dispatch("getFollower_Following", this.$cookie.get("token_access"));
      }
    },
  },
  methods: {
    async follow(user_id) {
      this.$store.dispatch("followUser", {'id': user_id, "token": this.$cookie.get("token_access")});
    },
    async unfollow(user_id) {
      this.$store.dispatch("unfollowUser", {'id': user_id, "token": this.$cookie.get("token_access")});
    },
    async nextPage() {
      this.page += 1;
      this.$store.dispatch("getUsager", {'page': this.page, "token": this.$cookie.get("token_access")});
    },
    async prevPage() {
      this.page -= 1;
      this.$store.dispatch("getUsager", {'page': this.page, "token": this.$cookie.get("token_access")});
    },
    isFollowed(id) {
      return Object.values(this.$store.state.following).some((element) => {
        if (element.id === id) {
          return true;
        }
      });
    },
  },
  async mounted() {
    if (this.$store.state.isConnected || this.$cookie.get("token_access") !== null ) {
      this.$store.dispatch("getUsager", {'page': this.page, "token": this.$cookie.get("token_access")});
      this.$store.dispatch("getFollower_Following", this.$cookie.get("token_access"));
    }
  },
};
</script>
<style>
.padding {
  padding: 10px;
  margin: 10px;
}
.alignLeft {
  display: flex;
  align-items: center;
}
.alignRight {
  align-items: left;
}
</style>
