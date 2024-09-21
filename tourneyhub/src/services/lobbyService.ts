import { LobbyDto } from '../dto/schedule/LobbyDto';
import { BaseEntityService } from './base/baseEntityService';

export class LobbyService extends BaseEntityService<LobbyDto> {
    constructor() {
        super('lobbies');
    }

    async getAllStage(stageId: number): Promise<LobbyDto[]> {
        const response =  await this.axios.get<LobbyDto[]>(`${this.baseUrl}?stageId=${stageId}`);

        console.log('getAllStage response: ', response);
        return response.data;
    }
}