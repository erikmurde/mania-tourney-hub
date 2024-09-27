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

    async updateInformation(tournamentId: string, information: string) {
        const response = await this.axios.put<string>(`${this.baseUrl}/${tournamentId}/information`, information);

        console.log('updateTournamentInformation response: ', response);
        return response.data;
    }

    async publish(tournamentId: string, tournament: TournamentPublishDto) {
        const response = await this.axios.put<TournamentPublishDto>(`${this.baseUrl}/${tournamentId}/publish`, tournament);

        console.log('publishTournament response: ', response);
        return response.data;
    }

    async makePrivate(tournamentId: string) {
        const response = await this.axios.put<TournamentPublishDto>(`${this.baseUrl}/${tournamentId}/private`);

        console.log('makeTournamentPrivate response: ', response);
        return response.data;
    }

    async registerPlayer(tournamentId: string) {
        await this.axios.put(`${this.baseUrl}/${tournamentId}/register`);
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
}