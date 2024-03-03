import { IStageDto } from '../dto/stage/IStageDto';
import { BaseEntityService } from './base/baseEntityService';

export class StageService extends BaseEntityService<IStageDto> {
    constructor() {
        super('stages');
    }

    async getAllTourney(tournamentId: string): Promise<IStageDto[]> {
        const response = await this.axios.get<IStageDto[]>(`${this.baseUrl}?tournamentId=${tournamentId}`);

        console.log('getAllTourney response: ', response);
        return response.data;
    }
}