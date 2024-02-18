import { AxiosInstance } from 'axios';
import baseAxios from './baseAxios';

export abstract class BaseService {
    protected axios: AxiosInstance;

    constructor() {
        this.axios = baseAxios;
    }
}