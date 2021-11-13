<template>
   <div id="user">
      <h1>User Profile</h1>
      <div class="flex-container bg">
         <div class="item">name place holder</div>
         <div class="item">3.8</div>
      </div>
      <div class="item bold">Favorites restaurants</div>
      <div class = "ListFavoritesContainer padding">
         <div class = "item">
            Your lists :
            <div v-for="list in ListFavorites.items" :key="list.id" class="list-group" >
               <b-input-group size="lg" class="mt-4">
                  <b-form-input v-model="list.name" placeholder="Change name..." id="inputValue"></b-form-input>
                  <b-input-group-append>
                     <b-button size ="lg" @click="updateListFavorites(list)" variant="outline-success">Change name</b-button>
                     <b-button size = "lg" @click="deleteListFavorites(list.id)" variant="danger">X</b-button>
                  </b-input-group-append>
               </b-input-group>
             
  <div>
    <b-button block v-b-toggle.sidebar-variant>View Restaurants</b-button>
    <b-sidebar id="sidebar-variant" :title="list.name" bg-variant="dark" text-variant="light" shadow right width = "30%" >
      <div class="px-2 py-1">
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
           <b-img class = "littleimg" :src="restaurant.pictures[0]" img-alt="Card image" left > </b-img>
     
         <router-link :to="{ name: 'Restaurant', params: {restaurantId: restaurant.id } }">
                              <div ><h2>{{restaurant.name}}</h2></div>
                           </router-link>
                        
                        <b-button size = "lg" @click="deleteRestaurantFromList(restaurant.id, list.id)" variant="danger">Delete X</b-button>
                     </div>
      </div>
    </b-sidebar>
  </div>
            </div>
         </div>
         <div class = "item">
            Create a new list :
            <b-input-group size = "lg" prepend="New list" >
               <b-form-input v-model="inputValue" placeholder="Choose a name..." variant="success"></b-form-input>
               <b-button size = "lg" :disabled="inputValue === ''" @click="createListFavorites" variant = "success">Create</b-button>
            </b-input-group>
         </div>
      </div>
      <div class="item bold">Recent restaurants Visited</div>
      <div class="padding" id="vistedContainer">
         <div class= "flex-container" v-for="restaurant in restaurants" :key="restaurant.id">
            <router-link :to="{ name: 'Restaurant', params: {restaurantId: restaurant.id } }">
              
               <div class = "item" > 
           <b-img class = "meanimg" :src="restaurant.pictures[0]" img-alt="Card image" left > </b-img>
     {{restaurant.name}}</div>
            </router-link>
            <div class = "item">
               1 visite
            </div>
            <select id="chosenLists" name="cars" v-model="selected" multiple>
               <option :key="list.id" v-for="list in ListFavorites.items">{{list.name}}</option>
            </select>
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
           async addRestaurantToList(listId, restaurantId) {
               await addRestaurantToList(listId, restaurantId);
               this.$store.state.ListFavorites = await getListFavorites();
           },
             async deleteRestaurantFromList(restaurantId, ListId) {
               await deleteRestaurantFromList(restaurantId, ListId);
               this.$store.state.ListFavorites = await getListFavorites();
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

   .b-dropdown-form{
     display:flex;
     
   align-content: flex;
   flex-flow: row wrap;
   justify-content: space-between;
   }

   .b-form-group-form{
     display:flex;
     
   align-content: flex;
   flex-direction: row;
   justify-content: space-between;
   }

   .item {
   font-size: 20px;
   padding: 1rem;
   padding-right: 4rem;
   flex-direction: column;
   display: flex;
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
   .littleimg {
   width: 100%;
   padding: 2px;
   align-content: center;
   }
   .meanimg {
   width: 20%;
   padding: 2px;
   align-content: center;
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