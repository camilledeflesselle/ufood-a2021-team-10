/* this file permits to extract data from the api described in url.js file
 */

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { endpoint, endpoint2 } from "./url.js";
import { getCoordinates } from "../api/localisation.js";

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
    listUsages: {},
    totalUsage: 0,
    follower: {},
    following: {},
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
    SET_geolocation(state, data) {
      state.geolocationPosition = data;
    },
    SET_list_usages(state, data) {
      state.listUsages = { ...data.items };
      state.totalUsage = data.total;
    },
    SET_list_follower_following(state, data) {
      state.follower = { ...data.followers };
      state.following = { ...data.following };
    },
  },
  actions: {
    async getList({ commit }) {
      const response = await axios.get(
        `${endpoint}/users/${owner.id}/favorites`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      commit("SET_LIST", response.data);
    },
    async getRestaurants({ commit }) {
      const response = await axios.get(`${endpoint}/restaurants`, {
        params: {
          limit: 100,
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
    async getInfoRestaurant({ commit }, id) {
      const response = await axios.get(
        `https://ufoodapi.herokuapp.com/unsecure/restaurants/${id}`,
        {}
      );
      commit("SET_info_restaurant", response.data);
    },
    async getlocation({ commit }) {
      const geolocationPosition = await getCoordinates();
      commit("SET_geolocation", geolocationPosition);
    },
    async getUsager({ commit }, page) {
      const response = await axios.get(`${endpoint}/users`, {
        params: {
          limit: 100,
          page: page,
        },
      });
      commit("SET_list_usages", response.data);
    },
    async followUser({ commit }, id) {
      try {
        const response = await axios.post(
          `${endpoint2}/follow`,
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MWI2NzkwMGNlODMxZDAwMDRlYWM2NTkiLCJleHAiOjE2Mzk0NDEzODE1MDF9.ewnT53bDbPGf3Ta0SfsDwrsB4K-lq9KdJBXI9sZ_Xdw",
            },
          }
        );
        // getFollower_Following()
        this.dispatch("getFollower_Following");
      } catch (err) {}
    },
    async unfollowUser({ commit }, id) {
      try {
        const response = await axios.delete(`${endpoint2}/follow/${id}`, {
          headers: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MWI2NzkwMGNlODMxZDAwMDRlYWM2NTkiLCJleHAiOjE2Mzk0NDEzODE1MDF9.ewnT53bDbPGf3Ta0SfsDwrsB4K-lq9KdJBXI9sZ_Xdw",
          },
        });
        this.dispatch("getFollower_Following");
      } catch (err) {}
    },
    async getFollower_Following({ commit }) {
      try {
        const response = await axios.get(`${endpoint2}/tokeninfo`, {
          headers: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MWI2NzkwMGNlODMxZDAwMDRlYWM2NTkiLCJleHAiOjE2Mzk0NDEzODE1MDF9.ewnT53bDbPGf3Ta0SfsDwrsB4K-lq9KdJBXI9sZ_Xdw",
          },
        });
        commit("SET_list_follower_following", response.data);
      } catch (err) {}
    },
  },
});
