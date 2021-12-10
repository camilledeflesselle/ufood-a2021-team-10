<template>
  <body>
    <b-card bg-variant="light">
      <div id="search-bar">
        <input
          placeholder="search for restaurants..."
          v-model="searchTerm"
          type="text"
        />
      </div>
      <b-form-group label="Price Range" v-slot="{ ariaDescribedby }">
        <b-form-checkbox
          v-for="option in PriceRanges"
          v-model="checkedPriceRange"
          :key="option"
          :value="option"
          :aria-describedby="ariaDescribedby"
          name="flavour-3a"
        >
          {{ representPrice(option) }}
        </b-form-checkbox>
      </b-form-group>

      <div>
        Cuisine
        <b-form-select
          v-model="checkedGenres"
          :options="genres"
          label="cuisine"
        ></b-form-select>
      </div>
    </b-card>
<div>
  <div>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item v-on:click="activeTab=1" v-bind:active="activeTab === 1">List View</b-nav-item>
       <b-nav-item v-on:click="activeTab=2" v-bind:active="activeTab === 2">Map View </b-nav-item>
       
      </b-nav>
    </b-card-header>
    <div>
     
            <listView :restaurantsFiltered="restaurantsFiltered" v-if="activeTab === 1"></listView>
        
            <mapView v-if="activeTab === 2"
          :restaurants="restaurantsFiltered"></mapView>
       

    </div>
</div>
  
</div>
  </body>
</template>
<script>
import listView from "./home/listView.vue";
import mapView from "./home/mapRestaurants.vue";


export default {
  name: "Home",
  components:{
    mapView,
    listView
  },
 
  data: function () {
    return {
      activeTab: 1,
      checkedGenres: [],
      checkedPriceRange: [],
      searchTerm: ""
    };
  },
  methods: {
    representPrice: function (range) {
      return "$".repeat(range);
    }
  },
  computed: {
    restaurants() {
      return this.$store.state.restaurants;
    },
    restaurantsFiltered() {
      let res = this.$store.state.restaurants;
      if (!res) {
        return res;
      }
      if (this.searchTerm !== "") {
        res = Object.values(res).filter((restaurant) => {
          return (
            restaurant.name
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1
          );
        });
      }

      if (this.checkedPriceRange.length) {
        res = Object.values(res).filter((restaurant) =>
          this.checkedPriceRange.includes(restaurant.price_range)
        );
      }
      if (this.checkedGenres.length) {
        res = Object.values(res).filter((restaurant) =>
          this.checkedGenres.includes(restaurant.genres[0])
        );
      }
      return res;
    },
    PriceRanges() {
      let data = this.$store.state.restaurants;
      let unique = [];
      if (data) {
        const array = Object.values(data);
        unique = [...new Set(array.map((array) => array.price_range))].sort();
      }
      return unique;
    },
    genres() {
      let data = this.$store.state.restaurants;
      let array = [];
      if (data) {
        array = Object.values(data);
        let arrays = [...new Set(array.map((array) => array.genres))];
        array = [...new Set(arrays.flat(1))].sort();
      }
      return array;
    },
  },
  async mounted() {
    this.$store.dispatch("getRestaurants");
    this.$store.dispatch("getRestaurantsVisited");
  },
};
</script>
<style>
.testMap{
  height:200px;
}

body{
  height:100%;
}
</style>
