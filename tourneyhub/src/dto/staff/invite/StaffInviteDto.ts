export interface StaffInviteDto {
    id: number,
    tournamentId: number,
    recipientId: number,
    sender: string
    tournament: string,
    role: string,
    status: string,
    description: string
}