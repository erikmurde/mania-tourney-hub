import { EventParticipantDto } from '../user/EventParticipantDto';

export interface PlayerScoreDto {
    player: EventParticipantDto,
    score: number,
    accuracy: number
}