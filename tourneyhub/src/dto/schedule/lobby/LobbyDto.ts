import { Dayjs } from 'dayjs';

export interface LobbyDto {
    id: string,
    stageId: string,
    matchId: number | null,
    code: string,
    time: Dayjs,
    concluded: boolean,
    players: string[],
    referee: string
}