<template>
      <b-button href = "/" size="sm" class="my-2 my-sm-0" type="submit"
                >Sign Out</b-button
              >
</template>
<script>
import {signOut} from '../../api/api/authentification.js';
export default ({
    name: "SignOut",
    methods :{
      async signOut() {
        await signOut(email, password); 
        this.$store.state.isConnected = false;

    }
  }
})
</script>
