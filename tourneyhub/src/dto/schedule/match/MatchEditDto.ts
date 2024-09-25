import { Dayjs } from 'dayjs';

export interface MatchEditDto {
    code: string,
    time: Dayjs,
    refereeId: string,
    streamerId: string,
    commentatorIds: string[]
}