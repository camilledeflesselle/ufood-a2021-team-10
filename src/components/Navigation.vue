<template>
  <nav id="navBase">
    <div id="navLeft">
      <div>UFood</div>
      <router-link to="/" class="menuItem" tag="div">
        <div class="menuItemText">Home</div>
      </router-link>
      <router-link to="/user" class="menuItem" tag="div">
        <div class="menuItemText">User</div>
      </router-link>
      <router-link to="/restaurant" class="menuItem" tag="div">
        <div class="menuItemText">Restaurant</div>
      </router-link>
      <!-- <ul>
        <li>
          <router-link to="/" class="menuItem">Home</router-link>
        </li>
        <li>
          <router-link to="/restaurant" class="menuItem">Restaurant</router-link>
        </li>
        <li>
          <router-link to="/user" class="menuItem">User Profile</router-link>
        </li>
      </ul> -->
      <div id="searchBar">
        <input id="searchBarInput" type="search" placeholder="Search">
        <button>Search</button>
      </div>
      <!-- <router-link to="/" tag="div">foo</router-link> -->
    </div>
    <div id="navRight">
      <router-link to="/" class="menuItemText">Log in/Log out</router-link>
      <router-link to="/user" class="menuItem" tag="div">
        <div class="menuItemText">User</div>
      </router-link>
    </div>
  </nav>
</template>

<style>
#navBase {
  background-color: rgb(219, 219, 219);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

#navLeft {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 0.5rem;
}

#navRight {
  display: flex;
  flex-flow: row-reverse wrap;
  align-items: center;
  padding-right: 0.5rem;
}

#searchBar {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.menuItem {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  min-width: 50px;
  max-width: 100px;
  cursor: pointer;
}

.menuItem:hover {
  background-color: rgb(121, 121, 121);
}

.menuItemText {
  color: rgb(0, 0, 0);
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

</style>
