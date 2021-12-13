import {testToken} from "./restaurants.js";

// create a list of favorite restaurants
export const createListFavorites = async (listName, userEmail) => {

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "connect.sid=s%3A75zFyvTZRk7rQ_juDpjNfzmZvkZbe2pe.xaSZI%2BUpGP6nYVCbxbTqoTf%2B6EpxHIFaF%2BKs0VATF3Q");

const res = testToken(myHeaders);
let urlencoded = new URLSearchParams();
urlencoded.append("name", listName);
urlencoded.append("owner", userEmail);
urlencoded.append("", "");

let requestOptions = {
  method: 'POST',
  headers: res.headers,
  body: urlencoded,
  redirect: 'follow'
};

const request = new Request(`${res.url}/favorites`, requestOptions)
    const response = await fetch(request);
    await response.json();
}

// get all list of restaurants favorite of the user
export const getListFavorites = async (id) => {
    const res  = testToken(new Headers());
    const request = new Request(
        `${res.url}/users/${id}/favorites`,
        {
            method: "GET",
           
            headers: res.headers,
            params:{
                limit:"30"
            }
        }
    );

    const response = await fetch(request);
    return (await response.json());
};


export const updateListFavorites = async ({owner, id, name})=>{
    const res  = testToken(new Headers());
    const request = new Request(
        `${res.url}/favorites/${id}`,
        {
            method: "PUT",
            headers: res.headers,
            body:JSON.stringify({
                name: name
            }),
            params: {
                owner: owner, 
                name: name
            }
        }
    );
    const response = await fetch(request);
    return await response.json();
};

export const deleteListFavorites = async (id)=>{
    const res  = testToken(new Headers());
    const request = new Request(
        `${res.url}/favorites/${id}`,
        {
            method: "DELETE",

            headers: res.headers,
        }
    )
    const response = await fetch(request);
    await response.json();
};

export const viewListFavorites = async (id)=>{
    const res  = testToken(new Headers());
    const request = new Request(
        `${res.url}/favorites/${id}`,
        {
            method: "GET",

            headers: res.headers,
        }
    )
    const response = await fetch(request);
    return await response.json();
};

export const addRestaurantToList = async (listId, restaurantId)=>{
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "connect.sid=s%3A75zFyvTZRk7rQ_juDpjNfzmZvkZbe2pe.xaSZI%2BUpGP6nYVCbxbTqoTf%2B6EpxHIFaF%2BKs0VATF3Q");
const res  = testToken(myHeaders);
let urlencoded = new URLSearchParams();
urlencoded.append("id", restaurantId);

let requestOptions = {
  method: 'POST',
  headers: res.headers,
  body: urlencoded,
  redirect: 'follow'
};
    const request = new Request(
        `${res.url}/favorites/${listId}/restaurants`,
        requestOptions
    );

    const response = await fetch(request);
    return await response.json();
};

export const deleteRestaurantFromList = async (restaurantId, Listid)=>{
    
    const res  = testToken(new Headers());
    const request = new Request(
        `${res.url}/favorites/${Listid}/restaurants/${restaurantId}`,
        {
            method: "DELETE",

            headers: res.headers,
        }
    );

    const response = await fetch(request);
};
