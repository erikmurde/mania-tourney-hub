import { TeamPlayerDto } from './TeamPlayerDto';

export interface TeamDto {
    id: string,
    tournamentId: string,
    name: string,
    logo: string,
    status: string,
    availability: string,
    seeding: number,
    placement: number,
    players: TeamPlayerDto[]
}