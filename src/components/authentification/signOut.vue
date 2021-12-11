<template>
      <b-button @click="signOut" size="sm" class="my-2 my-sm-0"
                >Sign Out</b-button
              >
</template>
<script>
import {signOut} from '../../api/api/authentification.js';
export default ({
    name: "SignOut",
    methods :{
      async signOut() {
        await signOut(); 
        this.$store.state.isConnected = false;

    }
  }
})
</script>
