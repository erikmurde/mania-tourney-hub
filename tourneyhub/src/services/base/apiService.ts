import { AxiosInstance, isAxiosError } from 'axios';
import apiAxios from './apiAxios';
import { ApiErrorResponse } from '../../dto/ApiErrorResponse';

export abstract class ApiService {

    protected axios: AxiosInstance;
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.axios = apiAxios;
        this.baseUrl = baseUrl;
    }

    getError(error: unknown): ApiErrorResponse {
        if (isAxiosError(error)) {
            return error.response?.data;
        }
        return { statusCode: 500, message: 'Unknown error' };
    }

    isErrorResponse(error: unknown): error is ApiErrorResponse {
        return (error as ApiErrorResponse).statusCode !== undefined;
    } 
}