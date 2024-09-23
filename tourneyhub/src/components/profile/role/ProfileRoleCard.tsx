import { Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { StyledCardContent } from '../../styled/StyledCardContent';
import { useEffect, useState } from 'react';
import { GFX, PLAYER } from '../../../constants';
import { TeamDto } from '../../../dto/team/TeamDto';
import { TeamService } from '../../../services/teamService';
import PlayerRoles from './PlayerRoles';
import StaffRoles from './StaffRoles';
import { TournamentRoleDto } from '../../../dto/tournamentRole/TournamentRoleDto';
import { TournamentStatsDto } from '../../../dto/TournamentStatsDto';

interface IProps {
    roles: TournamentRoleDto[],
    stats: TournamentStatsDto
}

const ProfileRoleCard = ({roles, stats}: IProps) => {
    const theme = useTheme();
    const [userTeam, setUserTeam] = useState(null as TeamDto | null);

    useEffect(() => {
        if (stats.teamId) {
            new TeamService()
                .getEntity(stats.teamId)
                .then(team => setUserTeam(team));
        }
    }, [stats.teamId]);

    const staffRoles = roles
        .filter(tourneyRole => tourneyRole.role !== PLAYER)
        .map(tourneyRole => tourneyRole.role === GFX 
            ? 'Graphics designer' 
            : tourneyRole.role[0].toUpperCase() + tourneyRole.role.slice(1)
        );

    const tourneyName = roles.length > 0 ? roles[0].tournament : '';
    const concluded = roles.length > 0 ? roles[0].concluded : false;

    return (  
        <Card elevation={12}>
            <StyledCardContent>
                <Grid container>
                    <Grid item flexGrow={1}>
                        <Typography fontWeight={500}>
                            {tourneyName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography 
                            fontWeight={700} 
                            color={concluded ? theme.palette.error.main : theme.palette.success.main}
                            >
                            {concluded ? 'ENDED' : 'ONGOING'}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }}/>
                <StaffRoles 
                    tourneyDone={concluded} 
                    staffRoles={staffRoles}/>
                <PlayerRoles 
                    tourneyDone={concluded} 
                    teamName={userTeam?.name}
                    seeding={userTeam ? userTeam.seed : stats.seed} 
                    placement={userTeam ? userTeam.placement : stats.placement}/>
            </StyledCardContent>
        </Card>
    );
}

export default ProfileRoleCard;