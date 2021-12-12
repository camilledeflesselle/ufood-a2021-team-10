import { endpoint } from "../store/url.js";
import { endpoint2} from "../store/url.js";

const testToken = function(myHeaders){
  const access_token = this.$cookie.access_token
  let url = endpoint
  if (access_token != undefined){
   myHeaders.append("Authorization", access_token);
   url = endpoint2
  }
  return myHeaders, url
}
const owner = {
  email: "test",
  name: "test",
  id: "5f766f6dad626a0004ba134f",
};

export const getVisitesOneRestaurant = async (id) => {
  myHeaders, url = testToken(new Headers());
  const request = new Request(`${url}/restaurants/${id}/visits`, {
    method: "GET",
    headers: myHeaders,
    params: {
      limit: "30",
    },
  });

  const response = await fetch(request);
  return await response.json();
};

export const visitesRestaurantOfUser = async (userId) => {
  myHeaders, url = testToken(new Headers());
  const request = new Request(
    `${url}/users/${userId}/restaurants/visits`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const visitesOfOneRestaurantByUser = async (userId, restaurantId) => {
  myHeaders, url = testToken(new Headers());
  const request = new Request(
    `${url}/users/${userId}/restaurants/${restaurantId}/visits`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const oneVisitOfUser = async (userId, visitId) => {
  myHeaders, url = testToken(new Headers());
  const request = new Request(
    `${url}/users/${userId}/restaurants/visits/${visitId}`,
    {
      method: "GET",
      headers: myHeaders
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const createVisit = async (userId, body) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "connect.sid=s%3AcVMNzJEmd1pLOu3sQfTvsPNoI9TrWK5_.cyL8L1JUvJslrAT041sg9aHSN5wrU0mxRofBAY7%2BJ28"
  );
  myHeaders, url = testToken(myHeaders);
  var urlencoded = new URLSearchParams();
  urlencoded.append("restaurant_id", body.restaurant_id);
  urlencoded.append("comment", body.comment);
  urlencoded.append("rating", body.rating);
  urlencoded.append("date", body.date);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const request = new Request(
    `${url}/users/${userId}/restaurants/visits/`,
    requestOptions
  );
  const response = await fetch(request);
  // console.log(response.json())
  return await response.json();
};
