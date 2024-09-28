import { ADMIN, COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../constants';
import { ICountryDto } from '../dto/ICountryDto';
import { UserDto } from '../dto/user/UserDto';
import { UserDtoSimple } from '../dto/user/UserDtoSimple';
import { UserEditDto } from '../dto/user/UserEditDto';
import { ApiEntityService } from './base/apiEntityService';

export class AuthService extends ApiEntityService<UserDto, UserDto, UserDto> {
    constructor() {
        super('users');
    }

    async getMe() {
        try {
            const response = await this.axios.get(`${this.baseUrl}/me`, 
                { withCredentials: true }
            );
            console.log('getMe response: ', response);
            return response.data;
        } catch (error) {}
    }

    async getAllSimple(): Promise<UserDtoSimple[]> {
        const response = await this.axios.get<UserDtoSimple[]>(`${this.baseUrl}/simple`);

        console.log('getAllUsersSimple response: ', response);
        return response.data;
    }

    async getUsersWithRoles(tournamentId: string, roles: string[], includeUserRoles: boolean = false): Promise<UserDtoSimple[]> {
        const response = await this.axios.get<UserDtoSimple[]>(`${this.baseUrl}/${tournamentId}`, { 
            params: { 
                roles: roles, 
                includeUserRoles: includeUserRoles 
            },
            paramsSerializer: { indexes: null }
        });
        console.log('getUsersWithRoles response: ', response);
        return response.data;
    }

    async updateMe(data: UserEditDto) {
        await this.axios.put(`${this.baseUrl}/me`, data);
    }

    async removeUserRole(userId: string, tournamentId: string, role: string) {
        await this.axios.delete(`${this.baseUrl}/${tournamentId}/${role}`, { 
            params: { userId: userId } 
        });
    }

    isHost(user: UserDto, tournamentId: string) {
        return this.getTournamentRoles(user, tournamentId).includes(HOST);
    }

    hasRoles(user: UserDto, tournamentId: string, ...roles: string[]) {
        return this
            .getTournamentRoles(user, tournamentId)
            .some(role => roles.includes(role));
    }

    isStaff(user: UserDto, tournamentId: string) {
        const staffRoles = [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];
        return this.hasRoles(user, tournamentId, ...staffRoles);
    }

    getLogo(country: ICountryDto) {
        return `https://assets.ppy.sh/old-flags/${country.iso2}.png`;
    }

    private getTournamentRoles(user: UserDto, tournamentId: string) {
        return user.roles
            .filter(tourneyRole => tourneyRole.tournamentId === tournamentId)
            .map(tourneyRole => tourneyRole.role);
    }
}