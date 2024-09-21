import { ApiService } from './apiService';

export abstract class ApiEntityService<TEntityDto, TEntityCreateDto, TEntityEditDto> extends ApiService {

    protected baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    async getAll(): Promise<TEntityDto[]> {
        const response = await this.axios.get<TEntityDto[]>(this.baseUrl);

        console.log('getAll response: ', response);
        return response.data;
    }

    async getEntity(id: number): Promise<TEntityDto> {
        const response = await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}`);

        console.log('getEntity response: ', response);
        return response.data;
    }

    async create(entity: TEntityCreateDto): Promise<TEntityCreateDto> {
        const response = await this.axios.post(this.baseUrl, entity);

        console.log('create response: ', response);
        return response.data;
    }

    async edit(id: number, entity: TEntityEditDto) {
        const response = await this.axios.put(`${this.baseUrl}/${id}`, entity);

        console.log('edit response: ', response);
    }
    
    async delete(id: number) {
        const response = await this.axios.delete(`${this.baseUrl}/${id}`);

        console.log('delete response: ', response);
    }
}