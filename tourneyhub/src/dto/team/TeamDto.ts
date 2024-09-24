import { UserDto } from '../user/UserDto';

export interface TeamDto {
    id: string,
    name: string,
    logo: string,
    availability: string,
    status: string,
    seed: number,
    placement: number,
    players: UserDto[]
}