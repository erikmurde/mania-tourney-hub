import { Dayjs } from 'dayjs';

export interface TournamentPublishDto {
    regsOpen: boolean,
    applicationsOpen: boolean,
    regDeadline: Dayjs | null,
    applicationDeadline: Dayjs | null
}