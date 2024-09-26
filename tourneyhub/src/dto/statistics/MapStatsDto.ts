import { PlayerScoreDto } from './PlayerScoreDto';
import { TeamScoreDto } from './TeamScoreDto';

export interface MapStatsDto {
    id: string,
    title: string,
    type: string,
    index: number,
    playerScores: PlayerScoreDto[],
    teamScores: TeamScoreDto[]
}