import { PlayerScoreDto } from '../score/PlayerScoreDto';
import { TeamScoreDto } from '../score/TeamScoreDto';

export interface MapStatsDto {
    id: string,
    stageId: string,
    title: string,
    type: string,
    index: number,
    scores: TeamScoreDto[] | PlayerScoreDto[]
}