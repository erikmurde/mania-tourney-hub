import { Grid } from '@mui/material';
import { UserDto } from '../../../dto/user/UserDto';
import ProfileRoleCard from './ProfileRoleCard';
import { TournamentRoleDto } from '../../../dto/tournamentRole/TournamentRoleDto';
import { TournamentStatsDto } from '../../../dto/TournamentStatsDto';

const ProfileRoles = ({user}: {user: UserDto}) => {
    const tourneyRoles = [] as {
        tournamentId: number, 
        roles: TournamentRoleDto[], 
        stats: TournamentStatsDto[]
    }[];

    user.roles.forEach(role => {
        const existing = tourneyRoles.find(tourneyRole => 
            tourneyRole.tournamentId === role.tournamentId
        );
        if (!existing) {
            tourneyRoles.push({
                tournamentId: role.tournamentId, 
                roles: user.roles.filter(userRole => userRole.tournamentId === role.tournamentId), 
                stats: user.stats.filter(stats => stats.tournamentId === role.tournamentId)
            });
        }
    });

    return (  
        <Grid container direction='column' rowSpacing={1}>
            {tourneyRoles.map((tourneyRole, index) => 
                <Grid item key={index}>
                    <ProfileRoleCard 
                        tournamentId={tourneyRole.tournamentId} 
                        userId={user.id}
                        roles={tourneyRole.roles}
                        stats={tourneyRole.stats.length > 0 ? tourneyRole.stats[0] : {} as TournamentStatsDto}
                    />
                </Grid>    
            )}
        </Grid>
    );
}

export default ProfileRoles;