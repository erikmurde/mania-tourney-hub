import { Dayjs } from 'dayjs';
import { TourneyLinkDto } from '../TourneyLinkDto';

export interface TournamentCreateDto {
    code: string,
    name: string,
    description: string,
    banner: string,
    keyCount: number,
    minTeamSize: number,
    maxTeamSize: number,
    minPlayerRank: number,
    maxPlayerRank: number,
    protects: boolean,
    warmups: boolean,
    regDeadline: Dayjs | null,
    applicationDeadline: Dayjs | null,
    information: string,
    regMessage: string,
    countries: string[],
    links: TourneyLinkDto[],
    hostRoles: string[]
}