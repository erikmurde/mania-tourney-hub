import { TournamentDto } from '../dto/tournament/TournamentDto';
import { UserDto } from '../dto/user/UserDto';
import { BaseEntityService } from './base/baseEntityService';

export class TournamentService extends BaseEntityService<TournamentDto> {
    constructor() {
        super('tournaments');
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