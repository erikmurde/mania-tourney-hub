export interface StaffInviteDto {
    id: string,
    tournamentId: string,
    senderId: string,
    recipientId: string | null,
    role: string,
    status: string,
    reason: string
}