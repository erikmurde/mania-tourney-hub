import axios from 'axios';

const baseAxios = axios.create(
    {
        baseURL: 'http://localhost:8000/',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
)

export default baseAxios;