import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
const APPLICATION_JSON = 'application/json';

export default axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': APPLICATION_JSON,
        'Accept': APPLICATION_JSON
    },
    withCredentials: true
});