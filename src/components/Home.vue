<template>
  <body>
    <b-card bg-variant="light">
      <div id="search-bar" class="dropdown">
        <input
          placeholder="search for restaurants..."
          v-model="searchTerm"
          type="text"
          autocomplete="off"
          id="inputValueId"
          @blur="lostFocus($event)"
          @input="searchValue()"
          @keydown="handleKeyDown"
        />
        <ul
          id="container"
          class="dropdown-menu"
          v-bind:style="{ display: display }"
        >
          <li
            v-for="(item, index) in items"
            v-bind:key="item.id"
            :class="activeClass(index)"
            @mousedown="selectItem(index)"
            @keydown.prevent="handleKeyDown"
            @mousemove="hoverItem(index)"
          >
            <a>{{ item.name }}</a>
          </li>
        </ul>
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
            <b-nav-item
              v-on:click="activeTab = 1"
              v-bind:active="activeTab === 1"
              >List View</b-nav-item
            >
            <b-nav-item
              v-on:click="activeTab = 2"
              v-bind:active="activeTab === 2"
              >Map View
            </b-nav-item>
          </b-nav>
        </b-card-header>
        <div>
          <listView
            :restaurantsFiltered="restaurantsFiltered"
            v-if="activeTab === 1"
          ></listView>

          <mapView v-if="activeTab === 2" :restaurants="restaurantsFiltered">
          </mapView>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import { restaurantsFiltered } from "../api/api/restaurants";
import listView from "./home/listView.vue";
import mapView from "./home/mapRestaurants.vue";

export default {
  name: "Home",
  components: {
    mapView,
    listView,
  },

  data: function () {
    return {
      activeTab: 1,
      checkedGenres: [],
      checkedPriceRange: [],
      searchTerm: "",
      items: [],
      display: "none",
      focusItem: -1,
    };
  },
  methods: {
    representPrice: function (range) {
      return "$".repeat(range);
    },
    handleKeyDown(e) {
      if (this.items.length == 0) return;
      let key = e.keyCode;

      // Key List
      const DOWN = 40;
      const UP = 38;
      const ENTER = 13;
      const ESC = 27;
      let container = this.$el.querySelector("#container");

      switch (key) {
        case DOWN:
          if (this.display === "none") this.display = "inline-block";
          this.focusItem++;
          break;
        case UP:
          this.focusItem--;
          break;
        case ENTER:
          this.display = "none";
          if (this.items.length >= 0) this.selectItem(this.focusItem);
          break;
        case ESC:
          this.display = "none";
          break;
        default:
          return;
      }
      this.focusItem = Math.min(
        Math.max(this.focusItem, 0),
        this.items.length - 1
      );
      container.scrollTop = container.children[0].clientHeight * this.focusItem;
    },
    activeClass(i) {
      return `${
        i === this.focusItem ? "dropdown-item active" : "dropdown-item"
      }`;
    },
    hoverItem(index) {
      this.focusItem = index;
    },
    selectItem(index) {
      let item = this.items[index];
      this.items = [];
      this.focusItem = -1;
      this.display = "none";
      this.$router.push({
        name: "Restaurant",
        params: { restaurantId: item.id },
      });
    },
    searchValue() {
      this.display = "none";
      this.items = [];
      if (this.searchTerm.length < 2) return;

      let res = this.$store.state.restaurants;
      res = Object.values(res).filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
          -1
        );
      });
      res.some((element) => {
        if (this.items.length > 5) {
          return;
        }
        this.items.push({ id: element.id, name: element.name });
      });
      if (this.items.length > 0) {
        this.display = "inline-block";
        this.focusItem = 0;
      }
    },
    lostFocus(e) {
      this.display = "none";
    },
  },
  computed: {
    geolocationPosition() {
      return this.$store.state.geolocationPosition;
    },

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
  mounted() {
    this.$store.dispatch("getRestaurants");
    this.$store.dispatch("getRestaurantsVisited");
    this.$store.dispatch("getlocation");
  },
};
</script>
<style>
.testMap {
  height: 200px;
}

body {
  height: 100%;
}
</style>
