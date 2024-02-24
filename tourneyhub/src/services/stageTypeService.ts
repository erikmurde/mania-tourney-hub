import { IStageTypeDto } from '../dto/stageType/IStageTypeDto';
import { BaseEntityService } from './base/baseEntityService';

export class StageTypeService extends BaseEntityService<IStageTypeDto> {
    constructor() {
        super('stageTypes');
    }
}