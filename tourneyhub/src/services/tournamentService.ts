import { TournamentDto } from '../dto/tournament/TournamentDto';
import { BaseEntityService } from './base/baseEntityService';

export class TournamentService extends BaseEntityService<TournamentDto> {
    constructor() {
        super('tournaments');
    }
}