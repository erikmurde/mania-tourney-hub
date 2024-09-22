import { StaffInviteCreateDto } from '../dto/staff/invite/StaffInviteCreateDto';
import { StaffInviteDto } from '../dto/staff/invite/StaffInviteDto';
import { ApiEntityService } from './base/apiEntityService';

export class StaffInviteService extends ApiEntityService<StaffInviteDto, StaffInviteCreateDto, StaffInviteDto> {
    constructor() {
        super('staffInvites');
    }

    async getAllOfUser(): Promise<StaffInviteDto[]> {
        const response = await this.axios.get<StaffInviteDto[]>(`${this.baseUrl}/user`);

        console.log('getAllStaffInvitesOfUser response: ', response);
        return response.data;
    }
}