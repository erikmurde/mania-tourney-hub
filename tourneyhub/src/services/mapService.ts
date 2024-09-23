import { HB, LN, RC, SV, TB } from '../constants';
import { IMapDto } from '../dto/map/IMapDto';
import { ISubmittedMapDto } from '../dto/map/ISubmittedMapDto';
import { ApiEntityService } from './base/apiEntityService';

export class MapService extends ApiEntityService<IMapDto, IMapDto, IMapDto> {
    constructor() {
        super('maps');
    }

    weights = new Map<string, number>([
        [RC, 0], [LN, 10e2], [HB, 10e4], [SV, 10e6], [TB, 10e8]
    ])

    getWeight(map: IMapDto): number {
        return (this.weights.get(map.mapType) ?? 0) + map.index;
    }

    sortMaps(maps: IMapDto[]): IMapDto[] {
        return maps.sort((a, b) => 
            this.getWeight(a) - this.getWeight(b) || a.artist.localeCompare(b.artist)
        );
    }

    async getAllByStageId(stageId: string): Promise<IMapDto[]> {
        const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}`);

        console.log('getAllMapsByStageId response: ', response);
        return this.sortMaps(response.data);
    }

    async getAllInMappoolByStageId(stageId: string): Promise<IMapDto[]> {
        const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}/inMappool`);

        console.log('getAllMapsInMappoolByStageId response: ', response);
        return this.sortMaps(response.data);
    }

    async createSubmitted(map: ISubmittedMapDto) {
        const response = await this.axios.post(`${this.baseUrl}/submitted`, map);

        console.log('createSubmittedMap response: ', response);
        return response.data;
    }

    async createUnsubmitted(map: IMapDto) {
        const response = await this.axios.post(`${this.baseUrl}/unsubmitted`, map);

        console.log('createUnsubmittedMap response: ', response);
        return response.data;
    }

    async updateSubmitted(mapId: string, map: ISubmittedMapDto) {
        const response = await this.axios.put(`${this.baseUrl}/submitted/${mapId}`, map);

        console.log('updateSubmittedMap response: ', response);
        return response.data;
    }

    async updateUnsubmitted(mapId: string, map: IMapDto) {
        const response = await this.axios.put(`${this.baseUrl}/unsubmitted/${mapId}`, map);

        console.log('updateUnsubmittedMap response: ', response);
        return response.data;
    }

    async updateInMappool(mapId: string, inMappool: boolean) {
        const response = await this.axios.put(`${this.baseUrl}/${mapId}/inMappool`, 
            { inMappool: inMappool }
        );

        console.log('updateMapInMappool response: ', response);
        return response.data;
    }
}