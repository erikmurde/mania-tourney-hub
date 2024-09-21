import { Dayjs } from 'dayjs';

export interface LobbyDto {
    id: number,
    stageId: number,
    code: string,
    time: Dayjs,
    mpLink: string,
    isDone: boolean,
    players: string[],
    referee: string
}