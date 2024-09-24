export interface TournamentStatsDto {
    tournamentId: string,
    team?: string,
    status: string,
    seed: number,
    placement: number,
    teamCaptain: boolean
}