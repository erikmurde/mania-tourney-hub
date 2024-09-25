import { TeamPlayerDtoSimple } from './TeamPlayerDtoSimple';

export interface TeamDtoSimple {
    id: string,
    name: string,
    logo: string,
    players: TeamPlayerDtoSimple[]
}