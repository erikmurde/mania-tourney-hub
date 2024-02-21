import { IMapDto } from '../dto/map/IMapDto';
import { BaseEntityService } from './base/baseEntityService';

export class MapService extends BaseEntityService<IMapDto> {
    constructor() {
        super('maps', 'mapType');
    }

    async getAllStage(stageId: string): Promise<IMapDto[]> {
        return (await this.axios.get<IMapDto[]>(`${this.baseUrl}${this.expand}&stageId=${stageId}`)).data;
    }

    async getAllStageInMappool(stageId: string): Promise<IMapDto[]> {
        return (await this.getAllStage(stageId)).filter(map => map.inMappool);
    }
}