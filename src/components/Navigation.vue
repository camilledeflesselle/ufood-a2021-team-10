<template>
  <!--
  <nav id="navBase">
    <div id="navLeft">
       <div>UFood</div> 
      <router-link to="/" id="titleText">UFood</router-link>
    </div>
    <div id="searchBar">
      <input id="searchBarInput" type="search" placeholder="Search" />
      <button id="searchBarButton">Search</button>
    </div>
    <div id="navRight">
      
      <div class="menuItemText">Log in/Log out</div>
      <router-link to="/user" class="menuItem" tag="div">
        <div class="menuItemText">Username</div>
      </router-link>
      <div class="menuItemText">Guest</div>
    </div>
  </nav>
  -->
  <div>
    <b-navbar
      :sticky="true"
      fixed="top"
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <div class="container-fluid">
        <b-navbar-brand href="/">UFood</b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item href="/#/user/#">
            <v-gravatar
              :email="emailAdress"
              alt="Nobody"
              :size="40"
              default-img="mm"
            />
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">FR</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import Vue from "vue";
import Gravatar from "vue-gravatar";

Vue.component("v-gravatar", Gravatar);

export default {
  name: "Nav",
  props: ["emailAdress"],
  // data: () => ({
  //   emailAdress: "anlav256@ulaval.ca",
  // }),
  async mounted() {
    // let adresseHash = md5("MyEmailAddress@example.com ".trim().toLowerCase());
  },
};
</script>

<style></style>
