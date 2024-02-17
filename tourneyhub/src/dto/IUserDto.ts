import { ITournamentRoleDto } from './ITournamentRoleDto';

export interface IUserDto {
    id: number,
    playerId: number,
    name: string,
    rank: number,
    country: string,
    discordUsername: string,
    timezone: number,
    avatar: string,
    roles: ITournamentRoleDto[]
}