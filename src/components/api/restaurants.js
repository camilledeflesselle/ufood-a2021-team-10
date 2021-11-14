import { endpoint } from "../store/url.js";
const owner = {
  email: "test",
  name: "test",
  id: "5f766f6dad626a0004ba134f",
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

export const visitesRestaurantOfUser = async (owner, userId) => {
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

export const createVisit = async (userId, {restaurantId, comment, rating, date}) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", "connect.sid=s%3A75zFyvTZRk7rQ_juDpjNfzmZvkZbe2pe.xaSZI%2BUpGP6nYVCbxbTqoTf%2B6EpxHIFaF%2BKs0VATF3Q");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("restaurant_id", restaurantId);
  urlencoded.append("comment", comment);
  urlencoded.append("rating", rating);
  urlencoded.append("date", date);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  const request = new Request(`${endpoint}/${userId}/restaurants/visits/`, requestOptions);
  const response = await fetch(request);
  return await response.json();
};
