import { Grid } from '@mui/material';
import { UserDto } from '../../../dto/user/UserDto';
import ProfileRoleCard from './ProfileRoleCard';
import { IRoleDto } from '../../../dto/IRoleDto';
import { IStatDto } from '../../../dto/IStatDto';

const ProfileRoles = ({user}: {user: UserDto}) => {
    const tourneyRoles = [] as {
        tournamentId: string, 
        roles: IRoleDto[], 
        stats: IStatDto[]
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
                        stats={tourneyRole.stats.length > 0 ? tourneyRole.stats[0] : {} as IStatDto}
                    />
                </Grid>    
            )}
        </Grid>
    );
}

export default ProfileRoles;