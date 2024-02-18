import { ITournamentDto } from '../dto/tournament/ITournamentDto';
import { BaseEntityService } from './base/baseEntityService';

export class TournamentService extends BaseEntityService<ITournamentDto> {
    constructor() {
        super('tournaments');
    }
}