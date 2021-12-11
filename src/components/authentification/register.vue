<template>
     <b-card-body class="text-center">
    
<b-input-group prepend="Name" class="mt-3">
    <b-form-input v-model="username"></b-form-input>
  </b-input-group>

  <b-input-group prepend="Email" class="mt-3">
    <b-form-input v-model="email"></b-form-input>
  </b-input-group>

  <b-input-group prepend="Password" class="mt-3">
    <b-form-input v-model="password" type="password"></b-form-input>
  </b-input-group>

  <b-button @click="signUp" variant="warning" class="mt-3 ">Sign up</b-button>


    </b-card-body>

</template>
<script>
import {signUp} from '../../api/api/authentification.js';
export default({
    name: "Register",
    data: function() {
        return {
            username: '',
            email:'',
            password:''
        }
    },
    methods :{
      async signUp() {
      let username = this.username;
      let email= this.email;
      let password = this.password;
      console.log(username);
      await signUp(username, email, password);
    },
    }
})
</script>
