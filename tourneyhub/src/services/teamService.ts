import { TeamDto } from '../dto/team/TeamDto';
import { BaseEntityService } from './base/baseEntityService';

export class TeamService extends BaseEntityService<TeamDto> {
    constructor() {
        super('teams');
    }

    async getTeams(tournamentId: string): Promise<TeamDto[]> {
        const response = await this.axios.get<TeamDto[]>('teams');

        const teams = response.data
            .filter(team => team.tournamentId === tournamentId);
        
        console.log('getTeams response: ', teams);
        return teams;
    }
}