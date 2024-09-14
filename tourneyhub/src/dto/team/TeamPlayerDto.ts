import { UserDto } from '../user/UserDto';

export interface TeamPlayerDto extends UserDto {
    isCaptain: boolean
}