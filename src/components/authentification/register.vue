<template>
     <b-card-body class="text-center">
    
<b-input-group prepend="name" class="mt-3">
    <b-form-input v-model="username"></b-form-input>
  </b-input-group>

  <b-input-group prepend="email" class="mt-3">
    <b-form-input v-model="email1"></b-form-input>
  </b-input-group>

  <b-input-group prepend="password" class="mt-3">
    <b-form-input v-model="password1" type="password"></b-form-input>
  </b-input-group>

  <b-button @click="signUp" variant="warning" class="mt-3 ">Sign up</b-button>

<div class="mt-3">{{message}}</div>
    
    </b-card-body>

</template>
<script>
import {signUp} from '../../api/api/authentification.js';
export default({
    name: "Register",
    data: function() {
        return {
            username: '',
            email1:'',
            password1:'',
            message: ''
        }
    },
    
    methods :{
      async signUp() {
      
      await signUp(this.username, this.email1, this.password1)
        .then(result => {
            this.message = `Your account has been successfully created, ${this.username} !`
        })
        .catch(error => {
this.message = "Sorry, please retry."
       
        }
             );
    },
    }
})
</script>
