import { Dayjs } from 'dayjs';

export interface LobbyDto {
    id: string,
    stageId: string,
    code: string,
    time: Dayjs,
    mpLink: string,
    isDone: boolean,
    players: string[],
    referee: string
}