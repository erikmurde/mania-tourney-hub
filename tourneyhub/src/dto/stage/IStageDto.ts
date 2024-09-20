import { Dayjs } from 'dayjs';
import { IStageTypeDto } from '../stageType/IStageTypeDto';

export interface IStageDto {
    id: string,
    tournamentId: string,
    name: string,
    bestOf: number,
    lobbySize: number,
    numAdvancing: number,
    schedulingDeadline: Dayjs,
    stageType: IStageTypeDto,
    mappoolPublished: boolean,
    schedulePublished: boolean,
    statsPublished: boolean
}