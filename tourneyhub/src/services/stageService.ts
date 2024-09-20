import { IStageDto } from '../dto/stage/IStageDto';
import { ApiEntityService } from './base/apiEntityService';

export class StageService extends ApiEntityService<IStageDto, IStageDto, IStageDto> {
    constructor() {
        super('stages');
    }

    async getByTournamentId(tournamentId: string): Promise<IStageDto[]> {
        const response = await this.axios.get<IStageDto[]>(`${this.baseUrl}/tournament/${tournamentId}`);

        console.log('getStagesByTournamentId response: ', response);
        return response.data;
    }
}