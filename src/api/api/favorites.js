import { endpoint } from "../store/url.js";
const owner = { 
    "email": "test", 
    "name": "test",
    "id": "5f766f6dad626a0004ba134f" 
}
// create a user
export const createUser = async () => {

        window.localStorage.setItem("userId", owner.id);
    
};

// create a list of favorite restaurants
export const createListFavorites = async (listName) => {
  
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "connect.sid=s%3A75zFyvTZRk7rQ_juDpjNfzmZvkZbe2pe.xaSZI%2BUpGP6nYVCbxbTqoTf%2B6EpxHIFaF%2BKs0VATF3Q");

var urlencoded = new URLSearchParams();
urlencoded.append("name", listName);
urlencoded.append("owner", owner.email);
urlencoded.append("", "");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

const request = new Request(`${endpoint}/favorites`, requestOptions)
    const response = await fetch(request);
    await response.json();
}

// get all list of restaurants favorite of the user
export const getListFavorites = async () => {
    const request = new Request(
        `${endpoint}/users/${owner.id}/favorites`,
        {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
            params:{
                limit:"30"
            }
        }
    );

    const response = await fetch(request);
    return (await response.json());
};


export const updateListFavorites = async ({owner, id, name}) => {
    const request = new Request(
        `${endpoint}/favorites/${id}`,
        {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name: name
            }),
            params: {
                owner: owner, 
                name: name
            }
        }
    );
    console.log(owner)
    window.localStorage.setItem("owner", owner);
    const response = await fetch(request);
    return await response.json();
};

export const deleteListFavorites = async (id) => {
    const request = new Request(
        `${endpoint}/favorites/${id}`,
        {
            method: "DELETE"
        }
    )
    const response = await fetch(request);
    await response.json();
};

export const viewListFavorites = async (id) => {
    const request = new Request(
        `${endpoint}/favorites/${id}`,
        {
            method: "GET"
        }
    )
    const response = await fetch(request);
    return await response.json();
};

export const addRestaurantToList = async (listId, restaurantId) => {
      
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "connect.sid=s%3A75zFyvTZRk7rQ_juDpjNfzmZvkZbe2pe.xaSZI%2BUpGP6nYVCbxbTqoTf%2B6EpxHIFaF%2BKs0VATF3Q");

var urlencoded = new URLSearchParams();
urlencoded.append("id", restaurantId);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
    const request = new Request(
        `${endpoint}/favorites/${listId}/restaurants`,
        requestOptions
    );

    const response = await fetch(request);
    return await response.json();
};

export const deleteRestaurantFromList = async (restaurantId, Listid) => {
    
    const request = new Request(
        `${endpoint}/favorites/${Listid}/restaurants/${restaurantId}`,
        {
            method: "DELETE"
        }
    );

    const response = await fetch(request);
};
