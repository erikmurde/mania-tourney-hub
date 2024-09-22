import { ICountryDto } from '../ICountryDto';

export interface UserDtoSimple {
    id: number,
    playerId: number,
    name: string,
    country: ICountryDto,
    roles: string[]
}