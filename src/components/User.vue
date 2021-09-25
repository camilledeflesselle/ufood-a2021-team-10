<template>
  <div>
    <h1>User Profile</h1>
    <div class="flex-container bg">
      <div class="item">name place holder</div>
      <div class="item">5/5</div>
    </div>
    <div class="item bold">Restaurant Visited</div>
    <div class="padding" id="vistedContainer">
      <div class="flex-container">
        <div class="item">Normandin</div>
        <div class="item">8 visistes</div>
      </div>
      <div class="flex-container">
        <div class="item">La Tanière</div>
        <div class="item">3 visistes</div>
      </div>
    </div>
    <div>
      no recent visits
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>
<script>

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
