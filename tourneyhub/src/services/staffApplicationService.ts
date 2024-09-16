import { ACCEPTED, PENDING, REJECTED } from '../constants';
import { StaffApplicationDto } from '../dto/staff/StaffApplicationDto';
import { BaseEntityService } from './base/baseEntityService';

export class StaffApplicationService extends BaseEntityService<StaffApplicationDto> {
    constructor() {
        super('staffApplications');
    }

    async getAllPending(tournamentId: string): Promise<StaffApplicationDto[]> {
        const response = await this.axios.get<StaffApplicationDto[]>(`${this.baseUrl}?tournamentId=${tournamentId}`);

        console.log('getAllPending response: ', response);
        return response.data
            .filter(application => application.status === PENDING);
    }

    async getAllUser(userId: string): Promise<StaffApplicationDto[]> {
        const response = await this.axios.get<StaffApplicationDto[]>(`${this.baseUrl}?senderId=${userId}`);

        console.log('getAllUser response: ', response);
        return response.data.filter(application => 
            [PENDING, ACCEPTED, REJECTED].includes(application.status)
        );
    }
}