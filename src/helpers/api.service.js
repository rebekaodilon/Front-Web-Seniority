import token from "./token.service"
const BASE_URL = process.env.ROOT_API;
const API_VERSION = process.env.API_VERSION;

export const API = {
    post : async (url, body) => fetch(BASE_URL + API_VERSION + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token.getToken(),
        },
        body: JSON.stringify(body)
    }).then(response => {
        if(response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
        if (response.ok)
            return response.json();
        else
            return response.json();
    }).catch(error => {
        return { Message: error };
    }),
    
    get : async (url) => fetch(BASE_URL + API_VERSION + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token.getToken()
        }
    }).then(response => {
        if(response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
        if(response.ok) {
            return response.json();
        }
    }).then(respo => {
        return  respo;
    }).catch(error => {
        return { Message: error };
    }),

    getViaCep : async (url) => fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(respo => {
        return  respo;
    }).catch(error => {
        return { Message: error };
    }),

	delete : async (url, body) => fetch(BASE_URL + API_VERSION + url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token.getToken()
        },
        body: JSON.stringify(body)
    }).then(response => {
        if(response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
        if (response.ok)
            return response.json();
        else
            return response.json();
    }).catch(error => {
        return { Message: error };
    }),
}

export default {
    API
}