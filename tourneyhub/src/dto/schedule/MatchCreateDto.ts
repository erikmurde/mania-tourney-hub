import { Dayjs } from 'dayjs';

export interface MatchCreateDto {
    id: string,
    stageId: string,
    matchId: number | null,
    code: string,
    time: Dayjs,
    score1: number,
    score2: number,
    isDone: boolean,
    player1: string,
    player2: string,
    referee: string,
    streamer: string,
    commentators: string[]
}