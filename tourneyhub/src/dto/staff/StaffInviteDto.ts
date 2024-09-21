import { staffRequestDto } from './staffRequestDto';

export interface StaffInviteDto extends staffRequestDto {
    recipientId: number,
    sender: string
}