export interface TournamentStatsDto {
    tournamentId: string,
    teamId?: string,
    status: string,
    seed: number,
    placement: number
}