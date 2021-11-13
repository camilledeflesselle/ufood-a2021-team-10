<template>
  <nav id="navBase">
    <div id="navLeft">
      <!-- <div>UFood</div> -->
      <router-link to="/" id="titleText">UFood</router-link>
    </div>
    <div id="searchBar">
      <input id="searchBarInput" type="search" placeholder="Search">
      <button id="searchBarButton">Search</button>
    </div>
    <div id="navRight">
      <!-- TODO: lier à la page de connexion quand ce sera implémenté -->
      <div class="menuItemText">Log in/Log out</div>
      <router-link to="/user" class="menuItem" tag="div">
        <div class="menuItemText">Username</div>
      </router-link>
      <div class="menuItemText">Guest</div>
    </div>
  </nav>
</template>

<style>
#navBase {
  background-color: #f1f1f1;
  padding-top: 1px;
  padding-bottom: 1px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  min-height: 3.5rem;
  max-height: 4rem;
}

#navLeft {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: inherit;
  max-height: inherit;
  padding-left: 0.5rem;
}

#navRight {
  display: flex;
  flex-flow: row-reverse wrap;
  align-items: center;
  min-height: inherit;
  max-height: inherit;
  padding-right: 0.5rem;
}

#searchBar {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  min-width: 200px;
  max-width: 500px;
  min-height: 30px;
  max-height: 50px;
}

#searchBarInput {
  /*
  * trouver comment étirer l'input sur une large résolution
  */
  border: solid 1px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  max-width: 300px;
  min-height: inherit;
}

#searchBarButton {
  border: solid 1px;
  border-top-right-radius: 15%;
  border-bottom-right-radius: 15%;
  min-height: inherit;
}

#searchBarButton:active {
  background-color: rgb(121, 121, 121);
}

#titleText {
  font-size: x-large;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-decoration: none;
  color: inherit;
  margin-right: 5px;
}

#titleText:hover {
  color: rgb(24, 247, 255);
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
  background-color: rgb(20, 56, 56);
}

.menuItemText {
  color: rgb(0, 0, 0);
  margin-left: 2px;
  margin-right: 2px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}

@media screen and (max-width: 600px) {
  #navBase {
    min-height: 4.2rem;
    max-height: 5rem;
  }

  #searchBarInput {
    max-width: 125px;
  }

  #navRight {
    flex-flow: column-reverse nowrap;
    min-width: 80px;
  }
}

</style>
