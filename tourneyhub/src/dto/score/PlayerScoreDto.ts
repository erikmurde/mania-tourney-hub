import { EventParticipantDto } from '../user/EventParticipantDto';
import { ScoreDto } from './ScoreDto';

export interface PlayerScoreDto {
    player: EventParticipantDto,
    scores: ScoreDto[]
}