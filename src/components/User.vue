<template>
  <div>
    <h1>User Profile</h1>
    <div class="flex-container bg">
      <div class="item">name place holder</div>
      <div class="item">3.8</div>
    </div>
    <div class="item bold">Restaurant Visited</div>
    <div class="padding" id="vistedContainer">
       <div class= "flex-container" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class = "item">
          {{restaurant.name}}
        </div>
        <div class = "item">
          8 visites
        </div>
      </div>
    </div>
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div>
      <router-link to="/user/best">lists of favorite restaurants</router-link>
    </div>
  </div>
</template>
<script>
export default{
  name: 'App', computed: {
    restaurants(){
      return this.$store.state.restaurants
    }
  },
  mounted(){
    this.$store.dispatch("getrestaurants")

  }
}
</script>
<style>
.flex-container {
  display: flex;
  align-content: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.item {
  font-size: 24px;
  padding: 1rem;
  padding-right: 4rem;
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
}
.padding {
  padding: 2rem;
}
.bg {
  background-color: aliceblue;
  border-radius: 16px;
}
.bold {
  font-weight: bold;
}
</style>
