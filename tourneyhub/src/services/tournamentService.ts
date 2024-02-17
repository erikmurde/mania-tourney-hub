import { ITournamentDto } from '../dto/tournament/ITournamentDto';
import { baseEntityService } from './base/baseEntityService';

export class tournamentService extends baseEntityService<ITournamentDto> {
    constructor() {
        super('tournaments');
    }
}