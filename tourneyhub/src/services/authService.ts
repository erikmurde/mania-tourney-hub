import { ADMIN, COMMENTATOR, GFX, HOST, MAPPER, MAPPOOLER, PLAYTESTER, REFEREE, SHEETER, STREAMER } from '../constants';
import { UserDto } from '../dto/user/UserDto';
import { BaseEntityService } from './base/baseEntityService';
import axios from 'axios';

export class AuthService extends BaseEntityService<UserDto> {
    constructor() {
        super('users');
    }

    isHost(user: UserDto, tournamentId: string) {
        const roles = user.roles
            .filter(role => role.tournamentId === tournamentId)
            .map(role => role.name);

        return roles.includes(HOST);
    }

    isStaff(user: UserDto, tournamentId: string) {
        const staffRoles = [HOST, ADMIN, MAPPOOLER, MAPPER, PLAYTESTER, REFEREE, STREAMER, COMMENTATOR, SHEETER, GFX];

        const userRoles = user.roles
            .filter(role => role.tournamentId === tournamentId)
            .map(role => role.name);

        return staffRoles.some(staffRole => userRoles.includes(staffRole));
    }

    async whoAmI() {
        try {
            const response = await axios.get('http://localhost:8080/api/whoAmI', 
                { withCredentials: true }
            );
            console.log('whoAmI response: ', response);
            return response.data;
        } catch (error) {}
    }

    async getStaff(tournamentId: string): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`users`);

        let staff = response.data
            .filter(user => 
                !user.roles.every(role => 
                    role.tournamentId !== tournamentId || role.name === 'player'));
    
        this.filterUserRolesByTournament(staff, tournamentId);
        this.filterUserStatsByTournament(staff, tournamentId);

        console.log('getStaff response: ', staff);
        return staff;
    }

    async getRoles(tournamentId: string, roles: string[]): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>(`users`);

        let users = response.data;
        this.filterUserRolesByTournament(users, tournamentId);
        this.filterUserStatsByTournament(users, tournamentId);

        users = users.filter(user => 
            user.roles.some(userRole => roles.includes(userRole.name))
        );

        console.log('getRoles response: ', users);
        return users;
    }

    async getPlayers(tournamentId: string): Promise<UserDto[]> {
        const response = await this.axios.get<UserDto[]>('users');

        const players = response.data
            .filter(user => 
                !user.roles.every(role => 
                    role.tournamentId !== tournamentId || role.name !== 'player'));

        this.filterUserRolesByTournament(players, tournamentId);
        this.filterUserStatsByTournament(players, tournamentId);

        console.log('getPlayers response: ', players);
        return players;
    }

    async getUser(id: string): Promise<UserDto> {
        const response = await this.axios.get<UserDto>(`users/${id}?_embed=stats`);

        console.log('getUser response: ', response)
        return response.data;
    }

    private filterUserRolesByTournament(users: UserDto[], tournamentId: string) {
        users.forEach(user => 
            user.roles = user.roles.filter(role => 
                role.tournamentId === tournamentId));
    }

    private filterUserStatsByTournament(users: UserDto[], tournamentId: string) {
        users.forEach(user =>
            user.stats = user.stats?.filter(stat => 
                stat.tournamentId === tournamentId));
    }
}