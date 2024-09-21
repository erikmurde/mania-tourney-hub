import { MatchDto } from '../dto/schedule/MatchDto';
import { BaseEntityService } from './base/baseEntityService';

export class MatchService extends BaseEntityService<MatchDto> {
    constructor() {
        super('matches');
    }

    async getAllStage(stageId: number): Promise<MatchDto[]> {
        const response =  await this.axios.get<MatchDto[]>(`${this.baseUrl}?stageId=${stageId}`);

        console.log('getAllStage response: ', response);
        return response.data;
    }
}