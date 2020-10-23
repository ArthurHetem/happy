import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.25.252.22:3333/',
});

export default api;