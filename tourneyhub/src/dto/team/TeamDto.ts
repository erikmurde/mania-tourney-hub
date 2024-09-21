import { TeamPlayerDto } from './TeamPlayerDto';

export interface TeamDto {
    id: number,
    tournamentId: number,
    name: string,
    logo: string,
    status: string,
    availability: string,
    seed: number,
    placement: number,
    players: TeamPlayerDto[]
}