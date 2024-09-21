import { StaffInviteDto } from '../dto/staff/StaffInviteDto';
import { BaseEntityService } from './base/baseEntityService';

export class StaffInviteService extends BaseEntityService<StaffInviteDto> {
    constructor() {
        super('staffInvites');
    }

    async getByUser(userId: number): Promise<StaffInviteDto[]> {
        const response = await this.axios.get<StaffInviteDto[]>(`${this.baseUrl}?recipientId=${userId}`);

        console.log('getByUser response: ', response);
        return response.data;
    }
}