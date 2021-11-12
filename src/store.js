/* this file permits to extract data from the api described in url.js file
*/

import Vue from "vue";
import Vuex from "vuex"
import axios from "axios"
import { endpoint } from "./url.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        restaurants: undefined,
        visitedrestaurants: undefined
    },
    mutations: {
        SET_restaurants(state, data){
            state.restaurants = {...data.items}
        }
    },
    actions: {
        async getrestaurants({commit}){
            const response = await axios.get(
                `${endpoint}/restaurants`, 
                 {
                params: {
                    limit: 10
                }
            })
            commit("SET_restaurants", response.data)
        }
    }
})