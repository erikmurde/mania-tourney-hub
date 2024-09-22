import { ADMIN, COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../constants';
import { UserDto } from '../dto/user/UserDto';
import { UserDtoSimple } from '../dto/user/UserDtoSimple';
import { ApiEntityService } from './base/apiEntityService';

export class AuthService extends ApiEntityService<UserDto, UserDto, UserDto> {
    constructor() {
        super('users');
    }

    isHost(user: UserDto, tournamentId: number) {
        const roles = user.roles
            .filter(role => role.tournamentId === tournamentId)
            .map(role => role.name);

        return roles.includes(HOST);
    }

    isStaff(user: UserDto, tournamentId: number) {
        const staffRoles = [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

        const userRoles = user.roles
            .filter(role => role.tournamentId === tournamentId)
            .map(role => role.name);

        return staffRoles.some(staffRole => userRoles.includes(staffRole));
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

    async getPlayers(tournamentId: number): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`${this.baseUrl}/${tournamentId}/players`);

        console.log('getPlayers response: ', response);
        return response.data;
    }

    async getStaff(tournamentId: number): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`${this.baseUrl}/${tournamentId}/staff`);

        console.log('getStaff response: ', response);
        return response.data;
    }

    async getUsersWithRoles(tournamentId: number, roles: string[], includeUserRoles: boolean = false): Promise<UserDtoSimple[]> {
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
}