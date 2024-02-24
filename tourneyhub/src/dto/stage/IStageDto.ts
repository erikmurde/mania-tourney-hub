import { Dayjs } from 'dayjs';
import { IStageTypeDto } from '../stageType/IStageTypeDto';
import { ISimpleStageDto } from './ISimpleStageDto';

export interface IStageDto extends ISimpleStageDto {
    stageTypeId: string,
    stageType?: IStageTypeDto,
    bestOf: number,
    lobbySize: number,
    numAdvancing: number,
    schedulingDeadline?: Dayjs
}