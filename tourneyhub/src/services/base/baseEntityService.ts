import { baseService } from './baseService';

export abstract class baseEntityService<TEntityDto> extends baseService {
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

    async getEntity(id: string): Promise<TEntityDto> {
        const response = await this.axios.get<TEntityDto>(`${this.baseUrl}/${id}`);

        console.log('getEntity response: ', response);
        return response.data;
    }
}