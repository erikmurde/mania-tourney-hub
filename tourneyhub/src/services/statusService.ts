import { StatusDto } from '../dto/StatusDto';
import { ApiEntityService } from './base/apiEntityService';

export class StatusService extends ApiEntityService<StatusDto, StatusDto, StatusDto> {
    constructor() {
        super('statuses');
    }

    public async getByName(name: string): Promise<StatusDto> {
        const response = await this.axios.get(`${this.baseUrl}/name/${name}`);

        console.log('getByName response: ', response);
        return response.data;
    }
}