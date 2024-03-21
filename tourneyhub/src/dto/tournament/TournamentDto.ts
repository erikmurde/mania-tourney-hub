import { Value } from 'react-quill';

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
    minRank: number,
    maxRank: number,
    protects: boolean,
    warmups: boolean,
    regOpen: boolean,
    applicationOpen: boolean,
    regDeadline: Date,
    applicationDeadline: Date,
    discordLink: string,
    forumLink: string,
    challongeLink: string,
    countries: string[],
    information: Value
}