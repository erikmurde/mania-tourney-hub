import { HB, LN, RC, SV, TB } from '../constants';
import { IMapDto } from '../dto/map/IMapDto';
import { ApiEntityService } from './base/apiEntityService';

export class MapService extends ApiEntityService<IMapDto, IMapDto, IMapDto> {
    constructor() {
        super('maps');
    }

    weights = new Map<string, number>([
        [RC, 0], [LN, 10e2], [HB, 10e4], [SV, 10e6], [TB, 10e8]
    ])

    getWeight(map: IMapDto): number {
        if (map.title === 'Heroes of our time') {
            console.log(this.weights.get(map.mapType));
        }

        return (this.weights.get(map.mapType) ?? 0) + map.index;
    }

    sortMaps(maps: IMapDto[]): IMapDto[] {
        return maps.sort((a, b) => 
            this.getWeight(a) - this.getWeight(b) || a.artist.localeCompare(b.artist)
        );
    }

    async getAllByStageId(stageId: number): Promise<IMapDto[]> {
        const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}`);

        console.log('getAllMapsByStageId response: ', response);
        return this.sortMaps(response.data);
    }

    async getAllInMappoolByStageId(stageId: number): Promise<IMapDto[]> {
        const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}/inMappool`);

        console.log('getAllMapsInMappoolByStageId response: ', response);
        return this.sortMaps(response.data);
    }

    async updateInMappool(mapId: number, inMappool: boolean) {
        const response = await this.axios.post(`${this.baseUrl}/${mapId}/inMappool`, 
            { inMappool: inMappool }
        );

        console.log('updateMapInMappool response: ', response);
        return response.data;
    }
}