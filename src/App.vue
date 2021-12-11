<template>
  <div id="app">
    <nav-menu emailAdress="anlav256@ulaval.ca"></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation,
  },
};
</script>

<style>
body {
  top: 70px;
}
</style>
