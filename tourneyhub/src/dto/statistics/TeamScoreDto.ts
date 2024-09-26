import { PlayerScoreDto } from './PlayerScoreDto';

export interface TeamScoreDto {
    name: string,
    logo: string,
    playerScores: PlayerScoreDto[]
}