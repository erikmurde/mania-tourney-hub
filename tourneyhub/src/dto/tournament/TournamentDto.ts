import { Dayjs } from 'dayjs';
import { Value } from 'react-quill';
import { TourneyLinkDto } from '../TourneyLinkDto';

export interface TournamentDto {
    id: string,
    name: string,
    code: string,
    description: string,
    banner: string,
    public: boolean,
    participantsPublic: boolean,
    done: boolean,
    keys: number,
    minTeamSize: number,
    maxTeamSize: number,
    minPlayerRank: number,
    maxPlayerRank: number,
    protects: boolean,
    warmups: boolean,
    regOpen: boolean,
    applicationOpen: boolean,
    regDeadline: Dayjs | null,
    applicationDeadline: Dayjs | null,
    links: TourneyLinkDto[],
    countries: string[],
    information: Value,
    regMessage: string
}