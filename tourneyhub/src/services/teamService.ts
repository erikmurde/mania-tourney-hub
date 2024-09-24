import { TeamDto } from '../dto/team/TeamDto';
import { TeamDtoSimple } from '../dto/team/TeamDtoSimple';
import { ApiEntityService } from './base/apiEntityService';

export class TeamService extends ApiEntityService<TeamDto, TeamDto, TeamDto> {
    constructor() {
        super('teams');
    }

    async getTeams(tournamentId: string): Promise<TeamDto[]> {
        const response = await this.axios.get<TeamDto[]>(`${this.baseUrl}/${tournamentId}`);

        console.log('getTeams response: ', response);
        return response.data;
    }

    async getSimpleTeams(tournamentId: string): Promise<TeamDtoSimple[]> {
        const response = await this.axios.get<TeamDtoSimple[]>(`${this.baseUrl}/${tournamentId}/simple`);

        console.log('getSimpleTeams response: ', response);
        return response.data;
    }

    async getTeamsByName(tournamentId: string, names: string[]): Promise<TeamDtoSimple[]> {
        return [];
        // const response = await this.axios.get<TeamDto[]>('teams');

        // const teams = response.data
        //     .filter(team => team.tournamentId === tournamentId && names.includes(team.name))
        //     .map(team => ({ 
        //         name: team.name, 
        //         logo: team.logo, 
        //         players: team.players.map(player => ({ 
        //             name: player.name, 
        //             isCaptain: player.isCaptain 
        //         })) 
        //     }));

        // console.log('getTeamsByName response: ', teams);
        // return teams;
    }
}