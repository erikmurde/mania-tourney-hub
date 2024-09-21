import { Dayjs } from 'dayjs';
import { UserDtoSimple } from '../user/UserDtoSimple';
import { TeamDtoSimple } from '../team/TeamDtoSimple';

export interface MatchDto {
    id: number,
    stageId: number,
    code: string,
    time: Dayjs,
    mpLink: string,
    score1: number,
    score2: number,
    isDone: boolean,
    player1: UserDtoSimple | TeamDtoSimple,
    player2: UserDtoSimple | TeamDtoSimple,
    referee: string,
    streamer: string,
    commentators: string[]
}