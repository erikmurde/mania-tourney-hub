import { PlayerScoreDto } from '../score/PlayerScoreDto';
import { TeamScoreDto } from '../score/TeamScoreDto';

export interface MapStatsDto {
    id: number,
    stageId: number,
    title: string,
    type: string,
    index: number,
    scores: TeamScoreDto[] | PlayerScoreDto[]
}