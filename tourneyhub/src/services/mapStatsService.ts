import { MapStatsDto } from '../dto/statistics/MapStatsDto';
import { TeamScoreDto } from '../dto/statistics/TeamScoreDto';
import { ApiEntityService } from './base/apiEntityService';

export class MapStatsService extends ApiEntityService<MapStatsDto, MapStatsDto, MapStatsDto> {
    constructor() {
        super('statistics');
    }

    async getAllInStage(stageId: string): Promise<MapStatsDto[]> {
        const response = await this.axios.get<MapStatsDto[]>(`${this.baseUrl}/${stageId}`);

        console.log('getAllStatsInStage response: ', response);
        return response.data;
    }

    getAllScores(mapStats: MapStatsDto, teamTourney: boolean = false, teamScore: boolean = false): number[] {
        if (teamTourney) {
            const scores = mapStats.teamScores;

            return teamScore 
                ? scores.map(stats => this.getTeamScore(stats))
                : scores.map(stats => this.getPlayerScores(stats)).flat()
        }
        return mapStats.playerScores
            .map(stats => stats.score);
    }

    getAllAccs(mapStats: MapStatsDto, teamTourney: boolean = false, teamScore: boolean = false): number[] {
        if (teamTourney) {
            const scores = mapStats.teamScores;

            return teamScore 
                ? scores.map(stats => this.getTeamAcc(stats))
                : scores.map(stats => this.getPlayerAccs(stats)).flat()
        }
        return mapStats.playerScores
            .map(playerScore => playerScore.accuracy);
    }

    getTeamScore(stats: TeamScoreDto): number {
        return this
            .getPlayerScores(stats)
            .reduce((score, sum) => sum + score, 0);
    }

    getTeamAcc(stats: TeamScoreDto): number {
        return Math.round(this
            .getPlayerAccs(stats)
            .reduce((acc, sum) => sum + acc, 0) 
            / stats.playerScores.length * 100) / 100;
    }

    getPlayerScores(stats: TeamScoreDto): number[] {
        return stats.playerScores.map(player => player.score);
    }

    getPlayerAccs(stats: TeamScoreDto): number[] {
        return stats.playerScores.map(player => player.accuracy);
    }
}