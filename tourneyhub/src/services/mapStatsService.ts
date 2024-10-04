import { MapStatsDto } from '../dto/statistics/MapStatsDto';
import { PlayerScoreDto } from '../dto/statistics/PlayerScoreDto';
import { TeamScoreDto } from '../dto/statistics/TeamScoreDto';
import { ApiEntityService } from './base/apiEntityService';

export class MapStatsService extends ApiEntityService<MapStatsDto, MapStatsDto, MapStatsDto> {
    constructor() {
        super('statistics');
    }

    async getAllInStage(stageId: string, signal?: AbortSignal): Promise<MapStatsDto[] | undefined> {
        try {
            const response = await this.axios.get<MapStatsDto[]>(`${this.baseUrl}/${stageId}`, {
                signal: signal
            });
            console.log('getAllStatsInStage response: ', response);
            return response.data;
    
        } catch (error) {}
    }

    async seedParticipants(stageId: string) {
        await this.axios.put(`${this.baseUrl}/${stageId}/seed`);
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

    getBestPlayerScore(stats: PlayerScoreDto[], player: string): number {
        const playerScores = stats
            .filter(score => score.player.name === player)
            .map(score => score.score);
        
        return Math.max(...playerScores);
    }

    getBestTeamScore(stats: TeamScoreDto[], team: string): number {
        const teamScores = stats
            .filter(score => score.name === team)
            .map(scores => this.getTeamScore(scores));

        return Math.max(...teamScores);
    }
    
    getTeamScore(stats: TeamScoreDto) {
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