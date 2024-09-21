import { UserDtoSimple } from '../../user/UserDtoSimple';

export interface StaffApplicationDto {
    id: number,
    sender: UserDtoSimple
    tournamentId: number,
    tournament: string,
    role: string,
    status: string,
    description: string
}