import { Dayjs } from 'dayjs';
import { EventParticipantDto } from '../EventParticipantDto';

export interface MatchDto {
    id: string,
    stageId: string,
    code: string,
    time: Dayjs,
    mpLink: string,
    score1: number,
    score2: number,
    isDone: boolean,
    player1: EventParticipantDto,
    player2: EventParticipantDto,
    referee: string,
    streamer: string,
    commentators: string[]
}