export interface TeamCreateDto {
    id: string,
    tournamentId: string,
    name: string,
    logo: string,
    status: string,
    availability: string,
    seed: number,
    placement: number,
    players: string[]
}