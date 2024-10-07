import { CanceledError } from 'axios';
import { HB, LN, RC, SV, TB } from '../constants';
import { IMapDto } from '../dto/map/IMapDto';
import { ISubmittedMapDto } from '../dto/map/ISubmittedMapDto';
import { ApiEntityService } from './base/apiEntityService';
import { ApiErrorResponse } from '../dto/ApiErrorResponse';

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

    async getAllByStageId(stageId: string, signal?: AbortSignal): Promise<IMapDto[] | undefined> {
        try {
            const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}`, {
                signal: signal
            });
            console.log('getAllMapsByStageId response: ', response);
            return this.sortMaps(response.data);

        } catch (error) {}
    }

    async getAllInMappoolByStageId(stageId: string, signal?: AbortSignal): Promise<IMapDto[] | undefined> {
        try {
            const response = await this.axios.get<IMapDto[]>(`${this.baseUrl}/stage/${stageId}/inMappool`, {
                signal: signal
            });
            console.log('getAllMapsInMappoolByStageId response: ', response);
            return this.sortMaps(response.data);

        } catch (error) {}
    }

    async createSubmitted(map: ISubmittedMapDto): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.post(`${this.baseUrl}/submitted`, map);
            console.log('createSubmittedMap response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }

    async createUnsubmitted(map: IMapDto): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.post(`${this.baseUrl}/unsubmitted`, map);
            console.log('createUnsubmittedMap response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }

    async updateSubmitted(mapId: string, map: ISubmittedMapDto): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.put(`${this.baseUrl}/submitted/${mapId}`, map);
            console.log('updateSubmittedMap response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }

    async updateUnsubmitted(mapId: string, map: IMapDto): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.put(`${this.baseUrl}/unsubmitted/${mapId}`, map);
            console.log('updateUnsubmittedMap response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }

    async updateInMappool(mapId: string, inMappool: boolean): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.put(`${this.baseUrl}/${mapId}/inMappool`, 
                { inMappool: inMappool }
            );
            console.log('updateMapInMappool response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }
}