import { IUserDto } from '../dto/IUserDto';
import { BaseService } from './base/baseService';

export class AuthService extends BaseService {
    constructor() {
        super();
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

    async getUser(): Promise<IUserDto> {
        const response = await this.axios.get<IUserDto>('me');

        console.log('getUser response: ', response)
        return response.data;
    }
}