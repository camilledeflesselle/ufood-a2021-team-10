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
    </div>
    <div id="apply-filters">
      <button>Apply filters</button>
    </div>

  </div>
  </body>
</template>

<style>
#search {
  background-color: peachpuff;
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
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

</style>

