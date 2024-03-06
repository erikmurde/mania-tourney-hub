import { IUserDto } from '../IUserDto';

export interface TeamPlayerDto extends IUserDto {
    isCaptain: boolean
}