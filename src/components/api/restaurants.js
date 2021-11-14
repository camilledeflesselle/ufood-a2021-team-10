import { endpoint } from "../store/url.js";
const owner = { 
    "email": "test", 
    "name": "test",
    "id": "5f766f6dad626a0004ba134f" 
}

export const restaurantInfo = async (id) => {

const request = new Request(`${endpoint}/restaurants/${id}`, 
{
    method: "GET",
    headers:{
        "Content-Type": "application/json",
    }
}
)
    const response = await fetch(request);
    return await response.json();
}

export const getVisitesOneRestaurant = async (id) => {
    const request = new Request(
        `${endpoint}/restaurants/${id}/visits`,
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

export const visitesRestaurantOfUser = async (owner, userId) => {
    const request = new Request(
        `${endpoint}/users/${userId}/restaurants/visits`,
        {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
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
            headers:{
                "Content-Type": "application/json",
            }
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
            headers:{
                "Content-Type": "application/json",
            }
        }
    )
    const response = await fetch(request);
    return await response.json();
};

export const createVisit = async (userId) => {
    const request = new Request(
        `${endpoint}/${userId}/restaurants/visits/`,
        {
            method: "POST",
            body: {

            }
        }
    )
    const response = await fetch(request);
    return await response.json();
};

export const addRestaurantToList = async (name, Listid, restaurantId) => {
    const request = new Request(
        `${endpoint}/favorites/${Listid}/restaurants/${restaurantId}`,
        {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name: name
            })
        }
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
