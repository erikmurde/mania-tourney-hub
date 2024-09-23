import { Dayjs } from 'dayjs';
import { TourneyLinkDto } from '../TourneyLinkDto';
import { SimpleTournamentDto } from './SimpleTournamentDto';

export interface TournamentDto extends SimpleTournamentDto {
    code: string,
    playersPublished: boolean,
    protects: boolean,
    warmups: boolean,
    regsOpen: boolean,
    applicationsOpen: boolean,
    regDeadline: Dayjs | null,
    applicationDeadline: Dayjs | null,
    information: string,
    regMessage: string,
    countries: string[],
    links: TourneyLinkDto[]
}