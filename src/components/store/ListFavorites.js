/* this file permits to extract data from the api described in url.js file
*/

import Vue from "vue";
import Vuex from "vuex"
import axios from "axios"
import { endpoint } from "./url.js"

Vue.use(Vuex)

const owner = { 
    "email": "test1@test.com", 
    "id": "5fa837737b90c80004f6c0d7" }

export const store = new Vuex.Store({
    state: {
        ListFavorites: [],
        restaurants: undefined,
    },
    mutations: {
        SET_LIST(state, data){
            state.ListFavorites = data
        },
        SET_restaurants(state, data){
            state.restaurants = {...data.items}
        }

    },
    actions: {
        async getList({commit}){
            const response = await axios.get(
                `${endpoint}/users/${owner.id}/favorites`,
                {
                    headers:{
                        "Content-Type": "application/json",
                    },
                    params:{
                        limit:"5"
                    }
                }
            )
            commit("SET_LIST", response.data)
        },
        async getRestaurants({commit}){
            const response = await axios.get(
                `${endpoint}/restaurants`, 
                 {
                params: {
                    limit: 10
                }
            })
            commit("SET_restaurants", response.data)
        }
    },
})