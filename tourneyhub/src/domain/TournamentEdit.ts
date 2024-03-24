import { TournamentDto } from '../dto/tournament/TournamentDto';

export interface TournamentEdit extends TournamentDto {
    hostRoles: string[],
    teamTourney: boolean,
    restrictRank: boolean
}