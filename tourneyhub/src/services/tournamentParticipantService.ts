import { UserDto } from '../dto/user/UserDto';
import { ApiService } from './base/apiService';

export class TournamentParticipantService extends ApiService {
    constructor() {
        super('tournamentParticipants');
    }

    async getPlayers(tournamentId: string): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`${this.baseUrl}/${tournamentId}/players`);

        console.log('getTournamentPlayers response: ', response);
        return response.data;
    }

    async getStaff(tournamentId: string): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`${this.baseUrl}/${tournamentId}/staff`);

        console.log('getTournamentStaff response: ', response);
        return response.data;
    }

    async registerPlayer(tournamentId: string) {
        await this.axios.post(`${this.baseUrl}/${tournamentId}/register`);
    }
}