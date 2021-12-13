import { endpoint, endpoint2} from "../store/url.js";

export const testToken = function(myHeaders){
   let url = endpoint
   const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
   console.log(match)
  if (match ){
     
     myHeaders.append("Authorization", match[2]);
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
  const res1 = testToken(myHeaders);
  let urlencoded = new res.urlSearchParams();
  urlencoded.append("restaurant_id", body.restaurant_id);
  urlencoded.append("comment", body.comment);
  urlencoded.append("rating", body.rating);
  urlencoded.append("date", body.date);

  let requestOptions = {
    method: "POST",
    headers: res1.myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const request = new Request(
    `${res1.url}/users/${userId}/restaurants/visits/`,
    requestOptions
  );
  const response = await fetch(request);
  // console.log(response.json())
  return await response.json();
};
