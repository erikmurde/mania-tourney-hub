import { Dayjs } from 'dayjs';

export interface MatchCreateDto {
    stageId: string,
    teams: boolean,
    code: string,
    time: Dayjs,
    player1Id: string,
    player2Id: string,
    refereeId: string,
    streamerId: string,
    commentatorIds: string[]
}