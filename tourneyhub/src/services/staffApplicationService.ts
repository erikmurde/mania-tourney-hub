import { ACCEPTED, PENDING, REJECTED } from '../constants';
import { StaffApplicationCreateDto } from '../dto/staff/application/StaffApplicationCreateDto';
import { StaffApplicationDto } from '../dto/staff/application/StaffApplicationDto';
import { StaffApplicationEditDto } from '../dto/staff/application/StaffApplicationEditDto';
import { ApiEntityService } from './base/apiEntityService';

export class StaffApplicationService extends ApiEntityService<StaffApplicationDto, StaffApplicationCreateDto, StaffApplicationEditDto> {
    constructor() {
        super('staffApplications');
    }

    async getAllPending(tournamentId: number): Promise<StaffApplicationDto[]> {
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