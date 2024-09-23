import { TeamPlayerDto } from './TeamPlayerDto';

export interface TeamDto {
    id: string,
    tournamentId: string,
    name: string,
    logo: string,
    status: string,
    availability: string,
    seed: number,
    placement: number,
    players: TeamPlayerDto[]
}