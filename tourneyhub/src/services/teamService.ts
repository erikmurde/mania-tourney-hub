import { TeamCreateDto } from '../dto/team/TeamCreateDto';
import { TeamDto } from '../dto/team/TeamDto';
import { TeamDtoSimple } from '../dto/team/TeamDtoSimple';
import { ApiEntityService } from './base/apiEntityService';

export class TeamService extends ApiEntityService<TeamDto, TeamCreateDto, TeamDto> {
    constructor() {
        super('teams');
    }

    async getTeams(tournamentId: string): Promise<TeamDto[]> {
        const response = await this.axios.get<TeamDto[]>(`${this.baseUrl}/${tournamentId}`);

        console.log('getTeams response: ', response);
        return response.data;
    }

    async getSimpleTeams(tournamentId: string, names?: string[]): Promise<TeamDtoSimple[]> {
        const response = await this.axios.get<TeamDtoSimple[]>(`${this.baseUrl}/${tournamentId}/simple`, {
            params: { names: names },
            paramsSerializer: { indexes: null }
        });
        console.log('getSimpleTeams response: ', response);
        return response.data;
    }
}