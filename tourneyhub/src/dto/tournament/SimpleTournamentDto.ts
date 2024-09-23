export interface SimpleTournamentDto {
    id: string,
    name: string,
    description: string,
    banner: string,
    keyCount: number,
    minTeamSize: number,
    maxTeamSize: number,
    minPlayerRank: number,
    maxPlayerRank: number,
    concluded: boolean,
    published: boolean
}