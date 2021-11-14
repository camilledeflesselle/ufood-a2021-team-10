/* this file permits to extract data from the api described in url.js file
 */

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { endpoint } from "./url.js";
import { addRestaurantToList } from "../api/favorites.js";

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
    getRestaurantsVisited: undefined,
  },
  mutations: {
    SET_LIST(state, data) {
      state.ListFavorites = data;
    },
<<<<<<< HEAD
    SET_restaurants(state, data) {
      state.restaurants = { ...data.items };
    },
    SET_restaurants_visited(state, data) {
      state.getRestaurantsVisited = { ...data.items };
=======
    mutations: {
        SET_LIST(state, data){
            state.ListFavorites = data
        },
        SET_restaurants(state, data){
            state.restaurants = {...data.items}
        },
        SET_restaurantsVisited(state, data){
            state.restaurantsVisited = {...data.items}
        }

>>>>>>> e7c6d8794e4789d1ee1ce54e29b91298f7dbc49f
    },
    actions: {
      async getList({ commit }) {
        const response = await axios.get(
          `${endpoint}/users/${owner.id}/favorites`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              limit: "5",
            },
          }
        );
        commit("SET_LIST", response.data);
      },
      async getRestaurants({ commit }) {
        const response = await axios.get(`${endpoint}/restaurants`, {
          params: {
            limit: 10,
          },
        });
        commit("SET_restaurants", response.data);
      },
      async getRestaurantsVisited({ commit }) {
        const response = await axios.get(
          `${endpoint}/users/${owner.id}/restaurants/visits`
        );
        commit("SET_restaurantsVisited", response.data);
      },
    },
  },
});
