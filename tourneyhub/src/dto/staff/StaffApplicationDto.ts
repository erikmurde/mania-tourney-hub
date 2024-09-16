import { staffRequestDto } from './staffRequestDto';

export interface StaffApplicationDto extends staffRequestDto {
    senderId: string
}