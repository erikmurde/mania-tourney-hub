import { Dayjs } from 'dayjs';
import { MatchPlayerDto } from './MatchPlayerDto';

export interface MatchDto {
    id: string,
    stageId: string,
    matchId: number | null,
    code: string,
    time: Dayjs,
    concluded: boolean,
    score1: number,
    score2: number,
    player1: MatchPlayerDto,
    player2: MatchPlayerDto,
    referee: string,
    streamer: string,
    commentators: string[]
}