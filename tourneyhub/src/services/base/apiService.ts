import { AxiosInstance } from 'axios';
import apiAxios from './apiAxios';

export abstract class ApiService {

    protected axios: AxiosInstance;
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.axios = apiAxios;
        this.baseUrl = baseUrl;
    }
}