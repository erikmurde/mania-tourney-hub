import { AxiosInstance } from 'axios';
import apiAxios from './apiAxios';

export abstract class ApiService {
    protected axios: AxiosInstance;

    constructor() {
        this.axios = apiAxios;
    }
}