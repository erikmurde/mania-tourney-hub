export interface StaffInviteDto {
    id: string,
    tournament: string,
    tournamentId: string,
    sender: string,
    recipientId: string,
    role: string,
    status: string,
    reason: string
}