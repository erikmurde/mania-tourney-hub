import { ISimpleStageDto } from '../dto/stage/ISimpleStageDto';
import { IStageDto } from '../dto/stage/IStageDto';
import { BaseEntityService } from './base/baseEntityService';

export class StageService extends BaseEntityService<IStageDto> {
    constructor() {
        super('stages', 'stageType');
    }

    async getAllSimple(tournamentId: string): Promise<ISimpleStageDto[]> {
        const response = await this.axios.get<ISimpleStageDto[]>(`${this.baseUrl}/simple/${tournamentId}`);

        console.log('getAllSimple response: ', response);
        return response.data;
    }
}