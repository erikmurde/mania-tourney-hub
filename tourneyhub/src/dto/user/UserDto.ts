import { ICountryDto } from '../ICountryDto';
import { TournamentRoleDto } from '../tournamentRole/TournamentRoleDto';
import { TournamentStatsDto } from '../TournamentStatsDto';

export interface UserDto {
    id: number,
    playerId: number,
    name: string,
    rank: number,
    country: ICountryDto,
    discordUsername: string,
    timezone: number,
    avatar: string,
    roles: TournamentRoleDto[],
    stats: TournamentStatsDto[]
}