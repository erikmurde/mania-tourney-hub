import { LobbyCreateDto } from '../dto/schedule/lobby/LobbyCreateDto';
import { LobbyDto } from '../dto/schedule/lobby/LobbyDto';
import { LobbyEditDto } from '../dto/schedule/lobby/LobbyEditDto';
import { LobbyRegisterDto } from '../dto/schedule/lobby/LobbyRegisterDto';
import { ApiEntityService } from './base/apiEntityService';

export class LobbyService extends ApiEntityService<LobbyDto, LobbyCreateDto, LobbyEditDto> {
    constructor() {
        super('lobbies');
    }

    async getAllByStageId(stageId: string): Promise<LobbyDto[]> {
        const response =  await this.axios.get<LobbyDto[]>(`${this.baseUrl}/${stageId}`);

        console.log('getAllLobbiesByStageId response: ', response);
        return response.data;
    }

    async registerParticipant(lobbyId: string, data: LobbyRegisterDto) {
        const response =  await this.axios.put(`${this.baseUrl}/${lobbyId}/register`, data);

        console.log('registerLobbyParticipant response: ', response);
        return response.data;
    }

    async unregisterParticipant(lobbyId: string, data: LobbyRegisterDto) {
        const response =  await this.axios.put(`${this.baseUrl}/${lobbyId}/unregister`, data);

        console.log('unregisterLobbyParticipant response: ', response);
        return response.data;
    }
}