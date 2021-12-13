import { endpoint, endpoint2} from "../store/url.js";
import Vue from "vue";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('7d')

export const testToken = function(myHeaders){
   let url = endpoint
   
   const match = Vue.$cookies.get("token_access")
   console.log(match)
  if (match ){
     
     myHeaders.append("Authorization", match);
     
     url = endpoint2

  }
   
    return {"headers":myHeaders, "url":url}
  }

export const getVisitesOneRestaurant = async (id) => {
  const res = testToken(new Headers());
  const request = new Request(`${res.url}/restaurants/${id}/visits`, {
    method: "GET",
    headers: res.myHeaders,
    params: {
      limit: "30",
    },
  });

  const response = await fetch(request);
  return await response.json();
};

export const visitesRestaurantOfUser = async (userId) => {
  const res = testToken(new Headers());
  const request = new Request(
    `${res.url}/users/${userId}/restaurants/visits`,
    {
      method: "GET",
      headers: res.myHeaders,
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const visitesOfOneRestaurantByUser = async (userId, restaurantId) => {
  const res = testToken(new Headers());
  const request = new Request(
    `${res.url}/users/${userId}/restaurants/${restaurantId}/visits`,
    {
      method: "GET",
      headers: res.myHeaders,
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const oneVisitOfUser = async (userId, visitId) => {
  const res = testToken(new Headers());
  const request = new Request(
    `${res.url}/users/${userId}/restaurants/visits/${visitId}`,
    {
      method: "GET",
      headers: myHeaders
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const createVisit = async (userId, body) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "connect.sid=s%3AcVMNzJEmd1pLOu3sQfTvsPNoI9TrWK5_.cyL8L1JUvJslrAT041sg9aHSN5wrU0mxRofBAY7%2BJ28"
  );
  const res = testToken(myHeaders);
  let urlencoded = new URLSearchParams();
  urlencoded.append("restaurant_id", body.restaurant_id);
  urlencoded.append("comment", body.comment);
  urlencoded.append("rating", body.rating);
  urlencoded.append("date", body.date);

  let requestOptions = {
    method: "POST",
    headers: res.headers,
    body: urlencoded,
    redirect: "follow",
  };

  const request = new Request(
    `${res.url}/users/${userId}/restaurants/visits/`,
    requestOptions
  );
  const response = await fetch(request);
  // console.log(response.json())
  return await response.json();
};
