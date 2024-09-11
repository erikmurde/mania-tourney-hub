import { IMapDto } from '../dto/map/IMapDto';
import { BaseEntityService } from './base/baseEntityService';

export class MapService extends BaseEntityService<IMapDto> {
    constructor() {
        super('maps', 'mapType');
    }

    weights = new Map<string, number>([
        ['RC', 0], ['LN', 10], ['HB', 20], ['SV', 30], ['TB', 40]
    ])

    getWeight(map: IMapDto): number {
        return (this.weights.get(map.mapType) ?? 0) + map.index;
    }

    async getAllStage(stageId: string): Promise<IMapDto[]> {
        const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}${this.expand}&stageId=${stageId}`);

        console.log('getAllStage response: ', response);
        return response.data;
    }

    async getAllStageInMappool(stageId: string): Promise<IMapDto[]> {
        return (await this
            .getAllStage(stageId))
            .filter(map => map.inMappool)
            .sort((a, b) => this.getWeight(a) - this.getWeight(b)
        );
    }
}