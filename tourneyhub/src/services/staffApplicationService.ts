import { StaffApplicationDto } from '../dto/staffApplication/StaffApplicationDto';
import { BaseEntityService } from './base/baseEntityService';

export class StaffApplicationService extends BaseEntityService<StaffApplicationDto> {
    constructor() {
        super('staffApplications');
    }
}