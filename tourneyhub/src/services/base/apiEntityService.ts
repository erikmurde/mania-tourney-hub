import { ApiService } from './apiService';
import { ApiErrorResponse } from '../../dto/ApiErrorResponse';

export abstract class ApiEntityService<TEntityDto, TEntityCreateDto, TEntityEditDto> extends ApiService {

    async getAll(): Promise<TEntityDto[]> {
        const response = await this.axios.get<TEntityDto[]>(this.baseUrl);

        console.log('getAll response: ', response);
        return response.data;
    }

    async getEntity(id: string): Promise<TEntityDto | ApiErrorResponse> {
        try {
            const response = await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}`);

            console.log('getEntity response: ', response);
            return response.data;
        } catch (error) {
            return this.getError(error);
        }
    }

    async create(entity: TEntityCreateDto): Promise<string | ApiErrorResponse> {
        try {
            const response = await this.axios.post(this.baseUrl, entity);

            console.log('create response: ', response);
            return response.data;
        } catch (error) {
            return this.getError(error);
        }
    }

    async edit(id: string, entity: TEntityEditDto): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.put(`${this.baseUrl}/${id}`, entity);
            console.log('edit response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }
    
    async delete(id: string): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.delete(`${this.baseUrl}/${id}`);
            console.log('delete response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }
}