import { Dayjs } from 'dayjs';

export interface MatchCreateDto {
    id: number,
    stageId: number,
    code: string,
    time: Dayjs,
    mpLink: string,
    score1: number,
    score2: number,
    isDone: boolean,
    player1: string,
    player2: string,
    referee: string,
    streamer: string,
    commentators: string[]
}