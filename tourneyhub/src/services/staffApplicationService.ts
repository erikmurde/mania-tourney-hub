import { ACCEPTED, PENDING, REJECTED } from '../constants';
import { StaffApplicationDto } from '../dto/staff/StaffApplicationDto';
import { ApiEntityService } from './base/apiEntityService';

export class StaffApplicationService extends ApiEntityService<StaffApplicationDto> {
    constructor() {
        super('staffApplications');
    }

    async getAllPending(tournamentId: string): Promise<StaffApplicationDto[]> {
        const response = await this.axios.get<StaffApplicationDto[]>(`${this.baseUrl}/pending/${tournamentId}`);

        console.log('getAllPending response: ', response);
        return response.data;
    }

    async getAllUser(): Promise<StaffApplicationDto[]> {
        const response = await this.axios.get<StaffApplicationDto[]>(`${this.baseUrl}/user`);

        console.log('getAllUser response: ', response);
        return response.data.filter(application => 
            [PENDING, ACCEPTED, REJECTED].includes(application.status)
        );
    }
}