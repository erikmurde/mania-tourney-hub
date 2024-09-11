import { MatchDto } from '../dto/schedule/MatchDto';
import { RefPick } from './RefPick';

export interface MatchStatus {
    match: MatchDto,
    firstPick: string,
    picks: RefPick[],
    bans: string[]
    protects: string[]
}