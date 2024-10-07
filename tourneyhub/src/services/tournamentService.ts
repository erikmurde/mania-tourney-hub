import { ApiErrorResponse } from '../dto/ApiErrorResponse';
import { SimpleTournamentDto } from '../dto/tournament/SimpleTournamentDto';
import { TournamentCreateDto } from '../dto/tournament/TournamentCreateDto';
import { TournamentDto } from '../dto/tournament/TournamentDto';
import { TournamentPublishDto } from '../dto/tournament/TournamentPublishDto';
import { UserDto } from '../dto/user/UserDto';
import { ApiEntityService } from './base/apiEntityService';

export class TournamentService extends ApiEntityService<TournamentDto, TournamentCreateDto, TournamentCreateDto> {
    constructor() {
        super('tournaments');
    }

    async getAllSimple(): Promise<SimpleTournamentDto[]> {
        const response = await this.axios.get<SimpleTournamentDto[]>(this.baseUrl);

        console.log('getAllSimpleTournaments response: ', response);
        return response.data;
    }

    async registerPlayer(tournamentId: string): Promise<ApiErrorResponse | undefined> {
        try {
            await this.axios.post(`${this.baseUrl}/${tournamentId}/register`);
        } catch (error) {
            return this.getError(error);
        }
    }

    async conclude(tournamentId: string): Promise<ApiErrorResponse | undefined> {
        try {
            await this.axios.put(`${this.baseUrl}/${tournamentId}/conclude`);
        } catch (error) {
            return this.getError(error);
        }
    }

    async publish(tournamentId: string, tournament: TournamentPublishDto): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.put<TournamentPublishDto>(`${this.baseUrl}/${tournamentId}/publish`, tournament);
            console.log('publishTournament response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }

    async makePrivate(tournamentId: string): Promise<ApiErrorResponse | undefined> {
        try {
            const response = await this.axios.put<TournamentPublishDto>(`${this.baseUrl}/${tournamentId}/private`);
            console.log('makeTournamentPrivate response: ', response);
        } catch (error) {
            return this.getError(error);
        }
    }

    async publishPlayers(tournamentId: string): Promise<ApiErrorResponse | undefined> {
        try {
            await this.axios.put(`${this.baseUrl}/${tournamentId}/publish-players`);
        } catch (error) {
            return this.getError(error);
        }
    }

    async eliminatePlayer(tournamentId: string, playerId: string, team: boolean): Promise<ApiErrorResponse | undefined> {
        try {
            await this.axios.put(`${this.baseUrl}/${tournamentId}/eliminate/${playerId}`, null, {
                params: { team: team }
            });
        } catch (error) {
            return this.getError(error);
        }
    }

    isValidUser(user: UserDto, tourney: TournamentDto): boolean {
        const validRank = (
            (tourney.minPlayerRank === 0 || user.rank >= tourney.minPlayerRank) && 
            (tourney.maxPlayerRank === 0 || user.rank <= tourney.maxPlayerRank)
        );
        const validCountry = (
            tourney.countries.length === 0 || 
            tourney.countries.includes(user.country.name)
        );
        return validRank && validCountry;
    }

    compareSeeds(seed1: number, seed2: number): number {
        if (seed1 === 0) {
            return seed2 === 0 ? 0 : 1;
        }
        if (seed2 === 0) {
            return -1;
        }
        return seed1 > seed2 ? 1 : -1;
    }
}