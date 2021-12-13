import { endpoint2 } from "../store/url.js";


export const signUp = async (name, email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3AcVMNzJEmd1pLOu3sQfTvsPNoI9TrWK5_.cyL8L1JUvJslrAT041sg9aHSN5wrU0mxRofBAY7%2BJ28"
    );
  
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  
    const request = new Request(
      `${endpoint2}/signup`,
      requestOptions
    );
    const response = await fetch(request);
    
  };

  export const signIn = async (email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3AcVMNzJEmd1pLOu3sQfTvsPNoI9TrWK5_.cyL8L1JUvJslrAT041sg9aHSN5wrU0mxRofBAY7%2BJ28"
    );
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  
    const request = new Request(
      `${endpoint2}/login`,
      requestOptions
    );
    const response = await fetch(request);
    
    return response.json();
  };


  export const signOut = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "connect.sid=s%3AcVMNzJEmd1pLOu3sQfTvsPNoI9TrWK5_.cyL8L1JUvJslrAT041sg9aHSN5wrU0mxRofBAY7%2BJ28"
    );
  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
  
    const request = new Request(
      `${endpoint2}/logout`,
      requestOptions
    );
    await fetch(request);

  };
