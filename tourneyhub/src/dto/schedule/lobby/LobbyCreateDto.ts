import { Dayjs } from 'dayjs';

export interface LobbyCreateDto {
    stageId: string,
    referee: string,
    time: Dayjs
}