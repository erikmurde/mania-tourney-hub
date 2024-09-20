import { ICountryDto } from '../ICountryDto';

export interface UserDtoSimple {
    id: string,
    playerId: number,
    name: string,
    country: ICountryDto
}