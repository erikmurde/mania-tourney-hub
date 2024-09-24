import { Dayjs } from 'dayjs';

export interface LobbyEditDto {
    referee: string | null,
    matchId: number | null,
    time: Dayjs,
    concluded: boolean
}