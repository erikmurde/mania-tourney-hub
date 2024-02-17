import { AxiosInstance } from 'axios';
import baseAxios from './baseAxios';

export abstract class baseService {
    protected axios: AxiosInstance;

    constructor() {
        this.axios = baseAxios;
    }
}