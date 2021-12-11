<template>
    <div>
  <b-button v-b-modal.modal-1>Sign in</b-button>

  <b-modal ref="modal-1" id="modal-1" 
  hide-footer
  title="Sign In/Register" 
  header-bg-variant="dark"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  modal-header-close="danger"
  >

    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item  v-on:click="tabs=1" v-bind:active="tabs === 1">Sign in</b-nav-item>
      <b-nav-item  v-on:click="tabs=2" v-bind:active="tabs === 2">Register</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body v-if="tabs===1" class="text-center">

  <b-input-group prepend="Email" class="mt-3">
    <b-form-input  v-model="email" ></b-form-input>
  </b-input-group>

  <b-input-group prepend="Password" class="mt-3">
    <b-form-input  v-model="password" type="password"></b-form-input>
  </b-input-group>

  <b-button @click="signIn" variant="warning" class="mt-3">Log in</b-button>
   <div class="mt-3">{{message}}</div>
    </b-card-body>

    <Register :email="email" :password="password" v-else></Register>
 
  </b-modal>
</div>

</template>
<script>

import {signIn} from '../../api/api/authentification.js';
import Register from "./register.vue"
export default ({
    name: "SignIn",
    components: {
      Register,
    },
    data: function() {
        return {
            tabs: 1,
            email: '',
            password: '',
            message: ''
        }
    },
    methods :{
      async signIn() {
        const email= this.email;
        const password = this.password;
        const userInfo = await signIn(email, password)
        .then(result => {
        this.$store.state.userInfo = result;
        this.$refs['modal-1'].hide();
        this.$store.state.isConnected = true;
    
        this.$cookie.set("token_access", result.token, "expiring time")
      
    })
        .catch(error => {
this.message = "Sorry, your email or password is wrong, please retry or register."
       
        }
             );
       

    }
  }
})
</script>
