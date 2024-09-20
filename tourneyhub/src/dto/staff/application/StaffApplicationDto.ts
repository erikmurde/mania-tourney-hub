import { UserDtoSimple } from '../../user/UserDtoSimple';

export interface StaffApplicationDto {
    id: string,
    sender: UserDtoSimple
    tournamentId: string,
    tournament: string,
    role: string,
    status: string,
    description: string
}