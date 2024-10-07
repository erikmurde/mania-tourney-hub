import { ADMIN, COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../constants';
import { ApiErrorResponse } from '../dto/ApiErrorResponse';
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

    async getTournamentPlayers(tournamentId: string): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`${this.baseUrl}/${tournamentId}/players`);

        console.log('getTournamentPlayers response: ', response);
        return response.data;
    }

    async getTournamentStaff(tournamentId: string): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`${this.baseUrl}/${tournamentId}/staff`);

        console.log('getTournamentStaff response: ', response);
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

    async updateMe(data: UserEditDto): Promise<ApiErrorResponse | undefined> {
        try {
            await this.axios.put(`${this.baseUrl}/me`, data);
        } catch (error) {
            return this.getError(error);
        }
    }

    async removeUserRole(userId: string, tournamentId: string, role: string): Promise<ApiErrorResponse | undefined> {
        try {
            await this.axios.delete(`${this.baseUrl}/${tournamentId}/${role}`, { 
                params: { userId: userId } 
            });
        } catch (error) {
            return this.getError(error);
        }
    }

    isHost(user: UserDto, tournamentId: string): boolean {
        return this.getTournamentRoles(user, tournamentId).includes(HOST);
    }

    hasRoles(user: UserDto | null, tournamentId: string, ...roles: string[]): boolean {
        if (!user) {
            return false;
        }
        return this
            .getTournamentRoles(user, tournamentId)
            .some(role => roles.includes(role));
    }

    isStaff(user: UserDto | null, tournamentId: string): boolean {
        const staffRoles = [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];
        return this.hasRoles(user, tournamentId, ...staffRoles);
    }

    getLogo(country: ICountryDto): string {
        return `https://assets.ppy.sh/old-flags/${country.iso2}.png`;
    }

    private getTournamentRoles(user: UserDto, tournamentId: string): string[] {
        return user.roles
            .filter(tourneyRole => tourneyRole.tournamentId === tournamentId)
            .map(tourneyRole => tourneyRole.role);
    }
}