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

    async getEntity(id: string): Promise<TEntityDto> {
        const response = await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}${this.expand}`);

        console.log('getEntity response: ', response);
        return response.data;
    }

    async create(entity: TEntityDto) {
        const response = await this.axios.post(this.baseUrl, entity);

        console.log('create response: ', response);
    }

    async edit(id: string, entity: TEntityDto) {
        const response = await this.axios.put(`${this.baseUrl}/${id}`, entity);

        console.log('edit response: ', response);
    }
}