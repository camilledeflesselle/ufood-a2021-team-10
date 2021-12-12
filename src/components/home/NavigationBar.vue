<template>
  <div class="container">
    <div class="row">
      <button @click="changeSorting">
        <img
          :src="icons[Number(isSortAlphabetical)]"
          width="24px"
          height="24px"
        />
      </button>
      <input
        v-on:input="$emit('searchTextChanged', $event.target.value)"
        placeholder="Search country"
      />
    </div>
    <h4 style="text-align: center">
      Average population: {{ formattedAverage }}
    </h4>
  </div>
</template>
<script>
import { formatLargeNumber } from "../../helper";

export default {
  name: "NavigationBar",
  props: {
    average: Number,
  },
  computed: {
    formattedAverage() {
      return formatLargeNumber(this.average);
    },
  },
  methods: {
    changeSorting() {
      this.isSortAlphabetical = !this.isSortAlphabetical;
      this.$emit("changeSorting");
    },
  },
  data() {
    return {
      icons: [
        "https://i.ya-webdesign.com/images/growth-vector-population-9.png",
        "https://www.shareicon.net/data/512x512/2015/08/25/90610_sort_512x512.png",
      ],
      isSortAlphabetical: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
}
.container button {
  border-radius: 4px;
}
.container button :hover {
  background-color: #dedede;
}
.container input {
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  margin-left: 8px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
