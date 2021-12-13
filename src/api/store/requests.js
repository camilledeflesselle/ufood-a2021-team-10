/* this file permits to extract data from the api described in url.js file
 */

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {getCoordinates} from "../api/localisation.js"
import {testToken} from "../api/restaurants.js"
Vue.use(Vuex);

const owner = {
  email: "test",
  name: "test",
  id: "5f766f6dad626a0004ba134f",
};
export const store = new Vuex.Store({
  state: {
    ListFavorites: {},
    restaurants: undefined,
    restaurantsVisited: {},
    nameRestaurant: {},
    info_restaurant: undefined,
    isConnected: false,
    userInfo: {email:"test@gmail.com"}
  },
  mutations: {
    SET_LIST(state, data) {
      state.ListFavorites = data;
    },
    SET_restaurants(state, data) {
      state.restaurants = { ...data.items };
    },
    SET_restaurantsVisited(state, data) {
      state.restaurantsVisited = { ...data.items };
    },
    SET_info_restaurant(state, data) {
      state.info_restaurant = data;
    },
    SET_geolocation(state, data){
      state.geolocationPosition = data;
    }
  },
  actions: {
    async getList({ commit }, userId) {
      const res = testToken(new Headers())
      const response = await axios.get(
        `${res.url}/users/${userId}/favorites`,
        {
          headers: res.headers
        }
      );
      commit("SET_LIST", response.data);
    },
    async getRestaurants({ commit }) {

      const res = testToken(new Headers())
      
      const response = await axios.get(`${res.url}/restaurants`, {
        params: {
          limit: 10,
        },
        headers: res.headers
      });
      commit("SET_restaurants", response.data);
    },
    async getRestaurantsVisited({ commit }, userId) {

      const res = testToken(new Headers())
      const response = await axios.get(
        `${res.url}/users/${userId}/restaurants/visits`, {
          headers: res.headers
        }
      );
      commit("SET_restaurantsVisited", response.data);
    },
    async getInfoRestaurant({ commit }, id) {

      const res = testToken(new Headers())
      const response = await axios.get(
        `${res.url}/restaurants/${id}`,
        {
          headers: res.headers
        }
      );
      commit("SET_info_restaurant", response.data);
    },
    async getlocation({commit}){
      const geolocationPosition = await getCoordinates()
      commit("SET_geolocation", geolocationPosition)
  }
  },
});
