import { HOST } from '../constants';
import { IUserDto } from '../dto/IUserDto';
import { BaseService } from './base/baseService';

export class AuthService extends BaseService {

    isHost(user: IUserDto, tournamentId: string) {
        const roles = user.roles
            .filter(role => role.tournamentId === tournamentId)
            .map(role => role.name);

        return roles.includes(HOST);
    }

    async login() {
        const url = new URL(
            "https://osu.ppy.sh/oauth/authorize"
        );

        url.searchParams.append('client_id', '29436');
        url.searchParams.append('redirect_uri', 'http://localhost:3000/auth/callback');
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('scope', 'identify');

        await fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        });
        window.location.assign(url);
    }

    async getStaff(tournamentId: string): Promise<IUserDto[]> {
        const response = await this.axios.get<IUserDto[]>(`users`);

        const staff = response.data
            .filter(user => 
                !user.roles.every(role => 
                    role.tournamentId !== tournamentId || role.name === 'player'));

        staff.forEach(user => 
            user.roles = user.roles.filter(role => 
                role.tournamentId === tournamentId));

        console.log('getStaff response: ', staff);

        return staff;
    }

    async getUser(id: string): Promise<IUserDto> {
        const response = await this.axios.get<IUserDto>(`users/${id}?_embed=stats`);

        console.log('getUser response: ', response)
        return response.data;
    }
}