import { TournamentCreateDto } from '../dto/tournament/TournamentCreateDto';

export interface TournamentEdit extends TournamentCreateDto {
    teamTourney: boolean,
    restrictRank: boolean,
    published: boolean
}