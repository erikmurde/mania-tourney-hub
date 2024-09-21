import { TeamDto } from '../dto/team/TeamDto';
import { TeamDtoSimple } from '../dto/team/TeamDtoSimple';
import { BaseEntityService } from './base/baseEntityService';

export class TeamService extends BaseEntityService<TeamDto> {
    constructor() {
        super('teams');
    }

    async getTeams(tournamentId: number): Promise<TeamDto[]> {
        const response = await this.axios.get<TeamDto[]>('teams');

        const teams = response.data
            .filter(team => team.tournamentId === tournamentId);
        
        console.log('getTeams response: ', teams);
        return teams;
    }

    async getSimpleTeams(tournamentId: number): Promise<TeamDto[]> {
        //TODO fetch simple dto from backend once available
        return await this.getTeams(tournamentId);
    }

    async getTeamsByName(tournamentId: number, names: string[]): Promise<TeamDtoSimple[]> {
        const response = await this.axios.get<TeamDto[]>('teams');

        const teams = response.data
            .filter(team => team.tournamentId === tournamentId && names.includes(team.name))
            .map(team => ({ 
                name: team.name, 
                logo: team.logo, 
                players: team.players.map(player => ({ 
                    name: player.name, 
                    isCaptain: player.isCaptain 
                })) 
            }));

        console.log('getTeamsByName response: ', teams);
        return teams;
    }

    async getUserTeam(userId: number, tournamentId: number): Promise<TeamDto | null> {
        const response = await this.getTeams(tournamentId);

        const team = response.find(team => 
            team.players.some(player => player.id === userId)
        );

        console.log('getUserTeam response: ', response);
        return team ?? null;
    }
}