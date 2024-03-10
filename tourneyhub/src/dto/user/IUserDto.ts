import { ICountryDto } from '../ICountryDto';
import { IRoleDto } from '../IRoleDto';
import { IStatDto } from '../IStatDto';

export interface IUserDto {
    id: string,
    playerId: number,
    name: string,
    rank: number,
    country: ICountryDto,
    discordUsername: string,
    timezone: number,
    avatar: string,
    roles: IRoleDto[],
    stats: IStatDto[]
}