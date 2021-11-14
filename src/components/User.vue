<template>
  <div id="user">
    <h1>User Profile</h1>
    <div class="flex-container bg">
      <div class="item">name place holder</div>
      <div class="item">3.8</div>
    </div>
    <div class="item bold">Favorites restaurants</div>
    <div class="ListFavoritesContainer padding">
      <div class="item">
        Your lists :
<<<<<<< HEAD
        <div
          v-for="list in ListFavorites.items"
          :key="list.id"
          class="list-group"
=======
      <div v-for="list in ListFavorites.items" :key="list.id" class="list-group" >
        <b-input-group size="lg" class="mt-4">
          <b-form-input v-model="list.name" placeholder="Change name..." id="inputValue"></b-form-input>
          <b-input-group-append>
            <b-button size ="lg" @click="updateListFavorites(list)" variant="outline-success">Change name</b-button>
            <b-button size = "lg" @click="deleteListFavorites(list.id)" variant="danger">X</b-button>
          </b-input-group-append>
        </b-input-group>
      
      <b-button block v-b-toggle="'test-'+list.id">View Restaurants</b-button>
      <b-collapse :id="'test-'+list.id" :title="list.name + 
          ', list of ' + list.restaurants.length + ' restaurant(s)'" bg-variant="dark" text-variant="light" shadow  >
          <h3>List : {{list.name}}</h3>
          Total : {{list.restaurants.length}}
        <div class="px-2 py-1">
          <ul v-for="restaurant in list.restaurants" :key="restaurant.id">
            <li>
              <router-link  :to="{ name: 'Restaurant', params: {restaurantId: restaurant.id } }">
                Name :{{restaurantsName[restaurant.id]}}
                 
              </router-link>
               <option>Id : {{restaurant}}</option>
               <b-button size = "lg" @click="deleteRestaurantFromList(restaurant.id, list.id)" variant="danger">Delete X</b-button>         
              
              </li>
          </ul>
        </div>
      </div>
      <div class="item">
        Create a new list :
        <b-input-group size="lg" prepend="New list">
          <b-form-input
            v-model="inputValue"
            placeholder="Choose a name..."
            variant="success"
          ></b-form-input>
          <b-button
            size="lg"
            :disabled="inputValue === ''"
            @click="createListFavorites"
            variant="success"
            >Create</b-button
          >
        </b-input-group>
      </div>
    </div>
    <div class="item bold">Recent restaurants Visited</div>
    <div class="padding" id="vistedContainer">
      <div id="restaurant-container">
<<<<<<< HEAD
        {{restaurantsVisited}}
    <div class="item-container" v-for ="restaurant in restaurants" :key ="restaurant.id">
      
      <h1>{{restaurant.name}}</h1>
      <img class="item-image" :src="restaurant.pictures[0]">
      <div>
        <p>
          {{viewNumberVisitsRestaurant(restaurant.id)}} visite
        </p>
       
              <div class = "item">
                 <router-link tag = "div" :to="{ name: 'Restaurant', params: {restaurantId: restaurant.id } }">
                  <button>More...</button>
              </router-link>
      <b-dropdown
        text="Ajouter Favoris"
        variant="primary"
        class="m-2"
        size="sm"
      >
        <b-dropdown-item
          v-for="list in ListFavorites.items"
          :key="list.id"
          @click="addRestaurantToList(list.id, restaurant.id)"
=======
        <div
          class="item-container"
          v-for="restaurant in restaurants"
          :key="restaurant.id"
>>>>>>> 85ad669e22077962b98916234ba31f6881106c73
>>>>>>> e7c6d8794e4789d1ee1ce54e29b91298f7dbc49f
        >
          <b-input-group size="lg" class="mt-4">
            <b-form-input
              v-model="list.name"
              placeholder="Change name..."
              id="inputValue"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                size="lg"
                @click="updateListFavorites(list)"
                variant="outline-success"
                >Change name</b-button
              >
              <b-button
                size="lg"
                @click="deleteListFavorites(list.id)"
                variant="danger"
                >X</b-button
              >
            </b-input-group-append>
          </b-input-group>
          <b-button block v-b-toggle="'test-' + list.id"
            >View Restaurants</b-button
          >
          <b-collapse
            :id="'test-' + list.id"
            :title="
              list.name +
              ', list of ' +
              list.restaurants.length +
              ' restaurant(s)'
            "
            bg-variant="dark"
            text-variant="light"
            shadow
          >
            <h3>List : {{ list.name }}</h3>
            Total : {{ list.restaurants.length }}
            <div class="px-2 py-1">
              <ul v-for="restaurant in list.restaurants" :key="restaurant.id">
                <li>
                  <router-link
                    :to="{
                      name: 'Restaurant',
                      params: { restaurantId: restaurant.id },
                    }"
                  >
                    Name :{{ restaurantsName[restaurant.id] }}
                  </router-link>
                  <option>Id : {{ restaurant }}</option>
                  <b-button
                    size="lg"
                    @click="deleteRestaurantFromList(restaurant.id, list.id)"
                    variant="danger"
                    >Delete X</b-button
                  >
                </li>
              </ul>
            </div>
          </b-collapse>
        </div>
        <div class="item">
          Create a new list :
          <b-input-group size="lg" prepend="New list">
            <b-form-input
              v-model="inputValue"
              placeholder="Choose a name..."
              variant="success"
            ></b-form-input>
            <b-button
              size="lg"
              :disabled="inputValue === ''"
              @click="createListFavorites"
              variant="success"
              >Create</b-button
            >
          </b-input-group>
        </div>
      </div>
      <div class="item bold">Recent restaurants Visited</div>
      <div class="padding" id="vistedContainer">
        <div id="restaurant-container">
          <div
            class="item-container"
            v-for="restaurant in restaurants"
            :key="restaurant.id"
          >
            <h1>{{ restaurant.name }}</h1>
            <img class="item-image" :src="restaurant.pictures[0]" />
            <div>
              <p>1 visite</p>

              <div class="item">
                <router-link
                  tag="div"
                  :to="{
                    name: 'Restaurant',
                    params: { restaurantId: restaurant.id },
                  }"
                >
                  <button>More...</button>
                </router-link>
                <b-dropdown
                  text="Ajouter Favoris"
                  variant="primary"
                  class="m-2"
                  size="sm"
                >
                  <b-dropdown-item
                    v-for="list in ListFavorites.items"
                    :key="list.id"
                    @click="addRestaurantToList(list.id, restaurant.id)"
                  >
                    {{ list.name }}
                  </b-dropdown-item>
                </b-dropdown>

                <button class="button">Entrer visit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>
<script>
import {
  createListFavorites,
  //createUser,
  getListFavorites,
  updateListFavorites,
  deleteListFavorites,
  deleteRestaurantFromList,
  addRestaurantToList,
  viewListFavorites,
} from "./api/favorites.js";
import {
  restaurantInfo,
  visitesRestaurantOfUser,
  visitesOfOneRestaurantByUser,
} from "./api/restaurants.js";

export default {
  name: "App",
  data: () => ({
    inputValue: "",
  }),
  computed: {
    ListFavorites() {
      return this.$store.state.ListFavorites;
    },
    restaurants() {
      return this.$store.state.restaurants;
    },
    restaurantsVisited() {
      return this.$store.state.restaurantsVisited;
    },
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
      if (restaurantId) {
        // be sure that list doens't have duplicated keys
        let res = await restaurantInfo(restaurantId);
        this.restaurantsName[restaurantId] = res.name;
        let oldList = await viewListFavorites(listId);
        oldList = oldList.restaurants;
        let obj = Object.values(oldList);
        for (let i = 0; i < oldList.length; i++) {
          obj[i] = oldList[i].id;
        }
        if (obj.indexOf(restaurantId) == -1) {
          await addRestaurantToList(listId, restaurantId);
        }
        this.$store.state.ListFavorites = await getListFavorites();
      }
    },
    async deleteRestaurantFromList(restaurantId, ListId) {
      if (restaurantId) {
        await deleteRestaurantFromList(restaurantId, ListId);
        this.$store.state.ListFavorites = await getListFavorites();
      }
    },
    async viewListFavorites(id) {
      return await viewListFavorites(id);
    },
    async restaurantInfo(idRestaurant) {
      if (idRestaurant) {
        let res = await restaurantInfo(idRestaurant);
        console.log(res);
        return res;
      }
    },
    async visitesOfOneRestaurantByUser(restaurantId) {
      if (restaurantId) {
        await visitesOfOneRestaurantByUser(restaurantId);
      }
<<<<<<< HEAD
    },
  },
  async mounted() {
    this.$store.dispatch("getList");
    this.$store.dispatch("getRestaurantsVisited");
    await this.$store.dispatch("getRestaurants");
    this.$store.state.ListFavorites.items.forEach(async (list) => {
=======
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
            if (restaurantId ){
              // be sure that list doens't have duplicated keys
              let res = await restaurantInfo(restaurantId);
              this.restaurantsName[restaurantId] = res.name;
              let oldList = await viewListFavorites(listId);
              oldList = oldList.restaurants;
              let obj = Object.values(oldList)
              for (let i=0; i<oldList.length; i++){
                obj[i] = oldList[i].id
              }
              if(obj.indexOf(restaurantId) == -1 ){
                await addRestaurantToList(listId, restaurantId);
              }
              this.$store.state.ListFavorites = await getListFavorites();
            }
            
          },
            async deleteRestaurantFromList(restaurantId, ListId) {
              if (restaurantId ){
                await deleteRestaurantFromList(restaurantId, ListId);
                this.$store.state.ListFavorites = await getListFavorites();
              }
          },
            async viewListFavorites(id) {
              return await viewListFavorites(id);

          },
           async restaurantInfo(idRestaurant) {
           
            if (idRestaurant){
              let res = await restaurantInfo(idRestaurant)
              console.log(res)
              return res

            }
          },
          async visitesOfOneRestaurantByUser(restaurantId){
             if (restaurantId ){
                await visitesOfOneRestaurantByUser(restaurantId);
              }
          },
          viewNumberVisitsRestaurant(restaurantId){
            let nb = 0
            const visits = this.$store.state.restaurantsVisited
            if (visits){
              for (let visit in visits){
              if (visits[visit].restaurant_id == restaurantId){++nb}
            }
            
            }
            return nb
          },
           restaurantsVisitedInfo(){
            let nb = 0
            const visits = this.$store.state.restaurantsVisited
            for (visit in visits){
              if (visits.id == restaurantId){++nb}
            }
            return nb
          }


    },
    mounted(){
      this.$store.dispatch("getList")
      this.$store.dispatch("getRestaurantsVisited")
      await this.$store.dispatch("getRestaurants");
      this.$store.state.ListFavorites.items.forEach(async (list) => {
>>>>>>> e7c6d8794e4789d1ee1ce54e29b91298f7dbc49f
      list.restaurants.forEach(async (resto) => {
        let res = await restaurantInfo(resto.id);
        this.restaurantsName[resto.id] = res.name;
      });
    });
  },
};
</script>
<style>
.flex-container {
  display: flex;
  align-content: flex;
  flex-flow: row wrap;
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
  background-color: aliceblue;
  flex: 1;
}
input {
  flex: 8;
}
.onelist {
  display: flex;
  border-radius: 10px;
  flex-direction: row;
}
.delete {
  color: white;
  background-color: #dd7e24;
  flex: 1;
}
.update {
  color: white;
  flex: 1;
  background-color: #7a7a79;
}
</style>
