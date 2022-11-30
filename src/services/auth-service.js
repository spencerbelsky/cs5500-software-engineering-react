import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL
//const BASE_URL = 'http://localhost:4000'
//console.log(BASE_URL)

const AUTH_API = `${BASE_URL}/api/auth`

const api = axios.create({
    withCredentials: true
});

export const signup = (user) =>
    api.post(`${AUTH_API}/register`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${AUTH_API}/login`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${AUTH_API}/profile`)
        .then(response => response.data);

export const logout = (user) =>
    api.post(`${AUTH_API}/logout`, user)
        .then(response => response.data);