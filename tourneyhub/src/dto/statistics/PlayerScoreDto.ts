import { UserDtoSimple } from '../user/UserDtoSimple';

export interface PlayerScoreDto {
    player: UserDtoSimple,
    score: number,
    accuracy: number,
    run: number
}