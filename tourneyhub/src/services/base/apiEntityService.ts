import { ApiService } from './apiService';

export abstract class ApiEntityService<TEntityDto, TEntityCreateDto, TEntityEditDto> extends ApiService {

    async getAll(): Promise<TEntityDto[]> {
        const response = await this.axios.get<TEntityDto[]>(this.baseUrl);

        console.log('getAll response: ', response);
        return response.data;
    }

    async getEntity(id: string): Promise<TEntityDto> {
        const response = await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}`);

        console.log('getEntity response: ', response);
        return response.data;
    }

    async create(entity: TEntityCreateDto): Promise<string> {
        const response = await this.axios.post(this.baseUrl, entity);

        console.log('create response: ', response);
        return response.data;
    }

    async edit(id: string, entity: TEntityEditDto) {
        const response = await this.axios.put(`${this.baseUrl}/${id}`, entity);

        console.log('edit response: ', response);
    }
    
    async delete(id: string) {
        const response = await this.axios.delete(`${this.baseUrl}/${id}`);

        console.log('delete response: ', response);
    }
}