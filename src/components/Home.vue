<template>
  <body onload="searchOptions()">
  <div id="search">
    <div id="search-bar"><input placeholder="search for restaurants..." id="input" type="search"></div>
    <div id="search-filter">
      <div class="filter-option">
        <div class="filter-title">
          Price range
        </div>
        <div id="price">
          <input type="checkbox" name="price" value="$"> $
          <input type="checkbox" name="price" value="$$"> $$
          <input type="checkbox" name="price" value="$$$"> $$$
        </div>
      </div>
      <div class="filter-option">
        <div class="filter-title">
          Type
        </div>
        <div id="type">
          <input type="checkbox" name="type" value="Chic"> Chic
          <input type="checkbox" name="type" value="Casual"> Casual
          <input type="checkbox" name="type" value="Cafe"> Cafe
          <input type="checkbox" name="type" value="Pub"> Pub
        </div>
      </div>
      <div class="filter-option">
        <div class="filter-title">
          Cuisine
        </div>
        <div id="cuisine">
          <input type="checkbox" name="type" value="Chic"> Italian
          <input type="checkbox" name="type" value="Casual"> Chinese
          <input type="checkbox" name="type" value="Cafe"> Thai
          <input type="checkbox" name="type" value="Pub"> Mexican
          <input type="checkbox" name="type" value="Pub"> American
        </div>
      </div>
    </div>
    <div id="apply-filters">
      <button>Apply filters</button>
    </div>

  </div>

  <div id="restaurant-container">
    <div class="item-container">
      <h1>Mission Chinese Food</h1>
      <img class="item-image" src="https://source.unsplash.com/1000x1000/?food,Asian">
      <div>
        <p>
          Best chinese food in town
        </p>
        <router-link to="/restaurant" tag="div">
          <button>More...</button>
        </router-link>
      </div>
    </div>

    <div class="item-container">
      <h1>Restaurant #2</h1>
      <img class="item-image" src="https://source.unsplash.com/1000x1000/?food">
      <div>
        <p>
          Pizza, Pasta, Lasagna...
        </p>
        <button>More...</button>
      </div>
    </div>

    <div class="item-container">
      <h1>Restaurant #3</h1>
      <img class="item-image" src="https://source.unsplash.com/1000x1000/?food">
      <div>
        <p>
          Pizza, Pasta, Lasagna...
        </p>
        <button>More...</button>
      </div>
    </div>

    <div class="item-container">
      <h1>Restaurant #4</h1>
      <img class="item-image" src="https://source.unsplash.com/1000x1000/?food">
      <div>
        <p>
          Pizza, Pasta, Lasagna...
        </p>
        <button>More...</button>
      </div>
    </div>

    <div class="item-container">
      <h1>Restaurant #5</h1>
      <img class="item-image" src="https://source.unsplash.com/1000x1000/?food">
      <div>
        <p>
          Pizza, Pasta, Lasagna...
        </p>
        <button>More...</button>
      </div>
    </div>

    <div class="item-container">
      <h1>Restaurant #6</h1>
      <img class="item-image" src="https://source.unsplash.com/1000x1000/?food">
      <div>
        <p>
          Pizza, Pasta, Lasagna...
        </p>
        <button>More...</button>
      </div>
    </div>

    </div>
  </body>
</template>

<style>
#search {
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 3rem;
}
#search-bar{
  padding:1rem;
  display:flex;

}
#search-filter{
  display:flex;
}
#apply-filters{
  padding: 1rem;
}
.filter-option {
  padding-left: 1rem;
  padding-right: 1rem;
}
.filter-title {
  font-size: 1.2rem;
  font-weight: bold;
}
@media screen and (max-width: 600px) {
  #nav .nav-item {
    display: none;
    visibility: hidden;
  }
  #menu-container {
    flex-direction: column;
  }
  #search-filter {
    flex-direction: column;
  }
}

#restaurant-container {
  display: flex;
  flex-wrap: wrap;
}

.item-container {
  width: 30%;
  padding: 1rem;

}

.item-image {
  width: 100%;
}

.item-container{
  width: 30%;
}

</style>

