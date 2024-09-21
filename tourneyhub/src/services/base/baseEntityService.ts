import { BaseService } from './baseService';

export abstract class BaseEntityService<TEntityDto> extends BaseService {
    protected baseUrl: string;
    protected expand: string;

    constructor(baseUrl: string, expand?: string) {
        super();
        this.baseUrl = baseUrl;
        this.expand = expand ? `?_expand=${expand}` : '';
    }

    async getAll(): Promise<TEntityDto[]> {
        const response = await this.axios.get<TEntityDto[]>(this.baseUrl + this.expand);

        console.log('getAll response: ', response);
        return response.data;
    }

    async getEntity(id: number): Promise<TEntityDto> {
        const response = await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}${this.expand}`);

        console.log('getEntity response: ', response);
        return response.data;
    }

    async create(entity: TEntityDto): Promise<TEntityDto> {
        const response = await this.axios.post(this.baseUrl, entity);

        console.log('create response: ', response);
        return response.data;
    }

    async edit(id: number, entity: TEntityDto) {
        const response = await this.axios.put(`${this.baseUrl}/${id}`, entity);

        console.log('edit response: ', response);
    }
    
    async delete(id: number) {
        const response = await this.axios.delete(`${this.baseUrl}/${id}`);

        console.log('delete response: ', response);
    }
}