import { TeamPlayerDtoSimple } from './TeamPlayerDtoSimple';

export interface TeamDtoSimple {
    name: string,
    logo: string,
    players: TeamPlayerDtoSimple[]
}