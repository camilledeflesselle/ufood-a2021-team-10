<template>
  <div>
    <b-navbar
      :sticky="true"
      fixed="top"
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <div class="container-fluid">
        <b-navbar-brand to="/">UFood</b-navbar-brand>
        
        <div v-if="this.$store.state.isConnected" >
      
          <b-navbar-nav class="ml-auto">
              <b-nav-item to="/user/#">
            <v-gravatar
              :email="emailAdress"
              alt="Nobody"
              :size="40"
              default-img="mm"
            />
          </b-nav-item>
            <b-nav-form>
              
                <SignOut></SignOut>

              
            </b-nav-form>
            
          </b-navbar-nav>
       
          </div>
          <div v-else>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              
               <SignIn></SignIn>

              
            </b-nav-form>
            
          </b-navbar-nav>
      
            </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import Vue from "vue";
import Gravatar from "vue-gravatar";
import SignIn from "./authentification/signIn.vue"

import SignOut from "./authentification/signOut.vue"
Vue.component("v-gravatar", Gravatar);

export default {
  name: "Nav",
  props: ["emailAdress"],
  components: {
    SignIn,
    SignOut,
  },
  data: () => ({
  //   emailAdress: "anlav256@ulaval.ca",
      isConnected2: true,
   }),
  async mounted() {
  
    // let adresseHash = md5("MyEmailAddress@example.com ".trim().toLowerCase());
  }

};
</script>

<style></style>
