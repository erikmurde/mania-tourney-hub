import { StaffApplicationDto } from '../dto/staffApplication/StaffApplicationDto';
import { BaseEntityService } from './base/baseEntityService';

export class StaffApplicationService extends BaseEntityService<StaffApplicationDto> {
    constructor() {
        super('staffApplications');
    }

    async getAllPending(tournamentId: string): Promise<StaffApplicationDto[]> {
        const response = await this.axios.get<StaffApplicationDto[]>(`${this.baseUrl}?tournamentId=${tournamentId}`);

        console.log('getAllPending response: ', response);
        return response.data
            .filter(application => application.status === 'pending');
    }
}