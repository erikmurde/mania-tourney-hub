import { ICountryDto } from '../ICountryDto';

export interface UserDtoSimple {
    playerId: number,
    name: string,
    country: ICountryDto
}