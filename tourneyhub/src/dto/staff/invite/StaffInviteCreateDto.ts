export interface StaffInviteCreateDto {
    recipientId: string,
    senderId: string,
    tournamentId: string,
    roleId: string,
    description: string
}