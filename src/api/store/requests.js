/* this file permits to extract data from the api described in url.js file
 */

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { endpoint, endpoint2 } from "./url.js";
import { getCoordinates } from "../api/localisation.js";
import { testToken } from "../api/restaurants.js";

import { useCookies } from "vue3-cookies";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("7d");
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
    userInfo: { email: "test@gmail.com" },
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
    async getList({ commit }, ob) {
      let id = ob.id;
      let token = ob.token;
      const response = await axios.get(`${endpoint2}/users/${id}/favorites`, {
        headers: {
          Authorization: token,
        },
      });
      commit("SET_LIST", response.data);
    },
    async getRestaurants({ commit }, token) {
      const response = await axios.get(`${endpoint2}/restaurants`, {
        params: {
          limit: 10,
        },
        headers: {
          Authorization: token,
        },
      });
      commit("SET_restaurants", response.data);
    },
    async getRestaurantsVisited({ commit }, ob) {
      let id = ob.id;
      let token = ob.token;
      const response = await axios.get(
        `${endpoint2}/users/${id}/restaurants/visits`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      commit("SET_restaurantsVisited", response.data);
    },
    async getInfoRestaurant({ commit }, ob) {
      let id = ob.id;
      let token = ob.token;
      const response = await axios.get(`${endpoint2}/restaurants/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      commit("SET_info_restaurant", response.data);
    },
    async getlocation({ commit }) {
      const geolocationPosition = await getCoordinates();
      commit("SET_geolocation", geolocationPosition);
    },
    async getUsager({ commit }, ob) {
      let page = ob.page;
      let token = ob.token;
      const response = await axios.get(`${endpoint2}/users`, {
        headers: {
          Authorization: token,
        },
        params: {
          limit: 100,
          page: page,
        },
      });
      commit("SET_list_usages", response.data);
    },
    async followUser({ commit }, ob) {
      let id = ob.id;
      let token = ob.token;
      try {
        const response = await axios.post(
          `${endpoint2}/follow`,
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        this.dispatch("getFollower_Following", token);
      } catch (err) {}
    },
    async unfollowUser({ commit }, ob) {
      let id = ob.id;
      let token = ob.token;
      try {
        const response = await axios.delete(`${endpoint2}/follow/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        this.dispatch("getFollower_Following", token);
      } catch (err) {}
    },
    async getFollower_Following({ commit }, token) {
      try {
        const response = await axios.get(`${endpoint2}/tokeninfo`, {
          headers: {
            Authorization: token,
          },
        });
        this.state.userInfo = response.data;
        commit("SET_list_follower_following", response.data);
      } catch (err) {
        console.log("this", err);
      }
    },
    async getFollower_Following1({ commit }, token) {
      try {
        const response = await axios.get(`${endpoint2}/tokeninfo`, {
          headers: {
            Authorization: token,
          },
        });
        const response1 = await axios.get(
          `${endpoint2}/users/${response.data.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        commit("SET_list_follower_following", response1.data);
      } catch (err) {}
    },
  },
});
