import { staffRequestDto } from './staffRequestDto';

export interface StaffInviteDto extends staffRequestDto {
    recipientId: string,
    sender: string
}