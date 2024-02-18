import { IMapDto } from '../dto/map/IMapDto';
import { BaseEntityService } from './base/baseEntityService';

export class MapService extends BaseEntityService<IMapDto> {
    constructor() {
        super('maps');
    }

    async getAllStage(stageId: string): Promise<IMapDto[]> {
        const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}`);

        console.log('getAllStage response: ', response);
        return response.data;
    }
}