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
        return (await this.axios.get<TEntityDto[]>(this.baseUrl + this.expand)).data;
    }

    async getEntity(id: string): Promise<TEntityDto> {
        return (await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}${this.expand}`)).data;
    }

    async create(entity: TEntityDto) {
        await this.axios.post(this.baseUrl, entity);
    }
}