import { UserDtoSimple } from '../user/UserDtoSimple';
import { staffRequestDto } from './staffRequestDto';

export interface StaffApplicationDto extends staffRequestDto {
    sender: UserDtoSimple
}