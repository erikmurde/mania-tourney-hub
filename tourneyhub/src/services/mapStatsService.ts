import { PlayerScoreDto } from '../dto/score/PlayerScoreDto';
import { MapStatsDto } from '../dto/statistics/MapStatsDto';
import { BaseEntityService } from './base/baseEntityService';

export class MapStatsService extends BaseEntityService<MapStatsDto> {
    constructor() {
        super('mapStats');
    }

    async getAllStage(stageId: string): Promise<MapStatsDto[]> {
        const response = await this.axios.get<MapStatsDto[]>(`${this.baseUrl}?stageId=${stageId}`);

        console.log('getAllStage response: ', response);
        return response.data;
    }

    getAllScores(mapStats: MapStatsDto): number[] {
        return (mapStats.scores as PlayerScoreDto[]).map(playerScore => playerScore.score);
    }

    getAllAccs(mapStats: MapStatsDto): number[] {
        return (mapStats.scores as PlayerScoreDto[]).map(playerScore => playerScore.accuracy);
    }
}