import { IUserDto } from '../user/IUserDto';

export interface TeamPlayerDto extends IUserDto {
    isCaptain: boolean
}