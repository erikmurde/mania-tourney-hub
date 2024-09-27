import { TournamentDto } from '../dto/tournament/TournamentDto';

export interface TournamentEdit extends TournamentDto {
    teamTourney: boolean,
    restrictRank: boolean,
    hostRoles: string[]
}