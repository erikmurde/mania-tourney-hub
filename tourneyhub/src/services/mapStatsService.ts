import { PlayerScoreDto } from '../dto/score/PlayerScoreDto';
import { TeamScoreDto } from '../dto/score/TeamScoreDto';
import { MapStatsDto } from '../dto/statistics/MapStatsDto';
import { BaseEntityService } from './base/baseEntityService';

export class MapStatsService extends BaseEntityService<MapStatsDto> {
    constructor() {
        super('mapStats');
    }

    async getAllStage(stageId: number): Promise<MapStatsDto[]> {
        const response = await this.axios.get<MapStatsDto[]>(`${this.baseUrl}?stageId=${stageId}`);

        console.log('getAllStage response: ', response);
        return response.data;
    }

    getAllScores(mapStats: MapStatsDto, teamTourney: boolean = false, teamScore: boolean = false): number[] {
        if (teamTourney) {
            const scores = (mapStats.scores as TeamScoreDto[]);

            return teamScore 
                ? scores.map(stats => this.getTeamScore(stats))
                : scores.map(stats => this.getPlayerScores(stats)).flat()
        }
        return (mapStats.scores as PlayerScoreDto[])
            .map(stats => stats.score);
    }

    getAllAccs(mapStats: MapStatsDto, teamTourney: boolean = false, teamScore: boolean = false): number[] {
        if (teamTourney) {
            const scores = (mapStats.scores as TeamScoreDto[]);

            return teamScore 
                ? scores.map(stats => this.getTeamAcc(stats))
                : scores.map(stats => this.getPlayerAccs(stats)).flat()
        }
        return (mapStats.scores as PlayerScoreDto[])
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
            / stats.players.length * 100) / 100;
    }

    getPlayerScores(stats: TeamScoreDto): number[] {
        return stats.players.map(player => player.score);
    }

    getPlayerAccs(stats: TeamScoreDto): number[] {
        return stats.players.map(player => player.accuracy);
    }
}