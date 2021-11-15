import { endpoint } from "../store/url.js";
const owner = {
  email: "test",
  name: "test",
  id: "5f766f6dad626a0004ba134f",
};

export const restaurantsFiltered = async (body) => {
  const request = new Request(`${endpoint}/restaurants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      limit: body.limit,
      page: body.page,
      q: body.searchTerm,
      genres: body.genres,
      lon: body.lon,
      lat: body.lat
    },
  });
  const response = await fetch(request).then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  return await response.json();
};

export const restaurantInfo = async (id) => {
  const request = new Request(`${endpoint}/restaurants/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetch(request);
  return await response.json();
};

export const getVisitesOneRestaurant = async (id) => {
  const request = new Request(`${endpoint}/restaurants/${id}/visits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      limit: "30",
    },
  });

  const response = await fetch(request);
  return await response.json();
};

export const visitesRestaurantOfUser = async (userId) => {
  const request = new Request(
    `${endpoint}/users/${userId}/restaurants/visits`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const visitesOfOneRestaurantByUser = async (userId, restaurantId) => {
  const request = new Request(
    `${endpoint}/users/${userId}/restaurants/${restaurantId}/visits`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await fetch(request);
  return await response.json();
};

export const oneVisitOfUser = async (userId, visitId) => {
  const request = new Request(
    `${endpoint}/users/${userId}/restaurants/visits/${visitId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    `${endpoint}/users/${userId}/restaurants/visits/`,
    requestOptions
  );
  const response = await fetch(request);
  // console.log(response.json())
  return await response.json();
};
