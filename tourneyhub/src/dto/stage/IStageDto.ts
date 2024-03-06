import { Dayjs } from 'dayjs';
import { ISimpleStageDto } from './ISimpleStageDto';

export interface IStageDto extends ISimpleStageDto {
    stageType: string,
    bestOf: number,
    lobbySize: number,
    numAdvancing: number,
    schedulingDeadline: Dayjs
}