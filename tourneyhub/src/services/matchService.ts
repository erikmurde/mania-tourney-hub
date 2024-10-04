import { MatchCreateDto } from '../dto/schedule/match/MatchCreateDto';
import { MatchDto } from '../dto/schedule/match/MatchDto';
import { MatchEditDto } from '../dto/schedule/match/MatchEditDto';
import { ApiEntityService } from './base/apiEntityService';

export class MatchService extends ApiEntityService<MatchDto, MatchCreateDto, MatchEditDto> {
    constructor() {
        super('matches');
    }

    async getAllByStageId(stageId: string, signal?: AbortSignal): Promise<MatchDto[] | undefined> {
        try {
            const response =  await this.axios.get<MatchDto[]>(`${this.baseUrl}/${stageId}`, {
                signal: signal
            });
            console.log('getAllMatchesByStageId response: ', response);
            return response.data;

        } catch (error) {}
    }

    async registerStaff(id: string, userId: string, role: string) {
        const response =  await this.axios.put(`${this.baseUrl}/${id}/register`, null, {
            params: { userId: userId, role: role }
        });
        console.log('registerStaffToMatch response: ', response);
        return response.data;
    }

    async unregisterStaff(id: string, userId: string, role: string) {
        const response =  await this.axios.put(`${this.baseUrl}/${id}/unregister`, null, {
            params: { userId: userId, role: role }
        });
        console.log('unregisterStaffFromMatch response: ', response);
        return response.data;
    }

    async conclude(id: string, matchId: number | null, score1: number, score2: number) {
        const response =  await this.axios.put(`${this.baseUrl}/${id}/conclude`, {
            matchId: matchId,
            score1: score1,
            score2: score2
        });
        console.log('concludeMatch response: ', response);
        return response.data;
    }
}