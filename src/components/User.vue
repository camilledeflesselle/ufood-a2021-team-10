<template>
  <div id="user">
    <h1>User Profile</h1>
    <div class="flex-container bg">
      <div class="item">name place holder</div>
      <div class="item">3.8</div>
    </div>
    <div class="item bold">Recent restaurants Visited</div>
    <div class="padding" id="vistedContainer">
      <div class= "flex-container" v-for="restaurant in restaurants" :key="restaurant.id">
        <router-link to="./restaurant" >
          <div >{{restaurant.name}}</div>
        </router-link>
        <div class = "item">
          1 visite
        </div>
      </div>
    </div>
    
    <div class="item bold">Favorites restaurants</div>
      <div class = "ListFavoritesContainer padding">
        <div class = "item">
          <span> New list :
		<input v-model="inputValue" placeholder="Choose a name..." id="inputValue">
		<button :disabled="inputValue === ''" @click="createListFavorites" id = "submit">Create</button>
		 </span>
        </div>
        <div class = "item">
          <div >
</div>
			<div v-for="list in ListFavorites.items" :key="list.id" class="list-group" >
        <div class = "onelist">
        <input v-model="list.name" placeholder="Change name..." id="inputValue">
          
				<button @click="updateListFavorites(list)" class = "update">Change name</button>
				<button @click="deleteListFavorites(list.id)" class = "delete">Delete List</button>

        <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">View Restaurants
  <span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a v-for="restaurant in restaurants" :key="restaurant.id" v-bind:href="'./restaurantpage' + restaurant.name">{{restaurant.name}}</a></li>
  </ul>
</div>
        </div>
			</div>
      </div>
		</div>

    <div>
      <router-link to="/">Home</router-link>
    </div>
  </div>
  
</template>
<script>
import{
    createListFavorites,
    //createUser,
    getListFavorites,
    updateListFavorites,
    deleteListFavorites,
    deleteRestaurantFromList,
    addRestaurantToList,
    viewListFavorites
}
from "./api/favorites.js";

export default{
  name: 'App', 
  data: () => ({
    inputValue: ''
  }),
  computed: {
    
    ListFavorites(){
      return this.$store.state.ListFavorites
    },
    restaurants(){
      return this.$store.state.restaurants
    }
   },
  methods: {
      clickHome() {
        this.$router.push('home', () => {})
      },
       async createListFavorites() {
            await createListFavorites(this.inputValue);
            this.inputValue = "";
            this.$store.state.ListFavorites = await getListFavorites();
        },
        async updateListFavorites(list) {
            await updateListFavorites(list);
            this.$store.state.ListFavorites = await getListFavorites();
        },
        async deleteListFavorites(id) {
            await deleteListFavorites(id);
            this.$store.state.ListFavorites = await getListFavorites();
        },
          async addRestaurantToList(id) {
            await addRestaurantToList(id);
            this.$store.state.ListFavorites = await getListFavorites();
        },
          async deleteRestaurantFromList(restaurantId, ListId) {
            await deleteRestaurantFromList(restaurantId, ListId);
            this.$store.state.oneListRest = await getListFavorites();
        },
          async viewListFavorites(id) {
            await viewListFavorites(id);
            this.$store.state.ListFavorites = await getListFavorites();
        }
  },
  async mounted(){
    this.$store.dispatch("getList")
    this.$store.dispatch("getRestaurants")
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
  .italic {
  font-weight: italic;
  }



#submit {
  background-color:aliceblue;
  flex:1
}


.list-group-item {
  
  display: flex;
  align-content: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

input {
  flex : 8;
}
.onelist {
  display: flex;
  border-radius:10px;
  flex-direction: row;
}
.delete {
  color:white;
  background-color:#dd7e24;
  flex:1;
}

.update {
  color:white;
  flex:1;
  background-color:#7a7a79;
}

</style>