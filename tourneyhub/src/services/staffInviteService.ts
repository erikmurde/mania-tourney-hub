import { StaffInviteDto } from '../dto/staffInvite/StaffInviteDto';
import { BaseEntityService } from './base/baseEntityService';

export class StaffInviteService extends BaseEntityService<StaffInviteDto> {
    constructor() {
        super('staffInvites');
    }
}